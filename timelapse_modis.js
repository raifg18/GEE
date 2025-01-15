// Llamamos a la colección de imágenes y filtramos fechas de análisis
var MODIS = ee.ImageCollection('MODIS/006/MOD13Q1')
  .filterDate('2018-03-01', '2018-08-10');

// Hacemos una llamada a la banda del índice o lo componemos a través del juego de bandas
var IndiceEVI = MODIS.select(['EVI']);

// Definimos las coordenadas máximas y mínimas de visualización en el timelapse
var ZonaAOI = ee.Geometry.Rectangle({
  coords: [[-89,-55], [-30,14]]});

// Parametrizamos el timelapse con proyección, resolución, AOI, valores de pixel y frames/seg
var Timelapse = {
  crs: 'EPSG:4326',
  dimensions: '600',
  region: ZonaAOI,
  min: 0,
  max: 3000,
  palette: 'ffffff, fcd163, 99b718, 66a000, 3e8601, 207401, 056201, 004c00, 011301',
  framesPerSecond: 5,};

// Creamos la animación con la colección de imagenes y parámetros del timelapses
var Animacion = ui.Thumbnail({
  image: IndiceEVI ,
  params: Timelapse,
  style: {
    position: 'bottom-right', 
    width: '300px'}});
Map.add(Animacion);

// Adicionalmente visualizamos una imagen compuesta del timelapse sobre el visor
var MODIS_Composicion = ee.Image(IndiceEVI .median());
Map.addLayer (MODIS_Composicion, {
  min: 0,
  max: 3000,
  palette: 'ffffff, fcd163, 99b718, 66a000, 3e8601, 207401, 056201, 004c00, 011301',
  bands: ['EVI']}, 
  'Indice EVI');
Map.centerObject(MODIS_Composicion, 2);