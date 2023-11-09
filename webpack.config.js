// path позволяет расчитывать пути правильно
const path = require('path');
// подключим HTML Webpack плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
// подключим miniCSS ExtractPluguin
const miniCSSExtractPlugin = require('mini-css-extract-plugin');

// сохраняем переменную NODE c защитой 
const mode = process.env.NODE_ENV || 'development';

// настроить автопрефиксер
// если dev-сборка то значение по умолчанию, иначе browserslist (см.target в доках)
const target = mode === 'development' ? 'web' : 'browserslist';

module.exports = {
  mode,
  target,
  // использовать sourceMap
  devtool: 'source-map',
  devServer: {
    // перезагружает страницу при изменениях
    hot: true,
  },
  // входной путь 
  entry: './src/index.js',
  output: {
    // выходной файл
    filename: 'index.js',
    // куда складывать готовые файлы (dirname - до текущей директории)
    path: path.resolve(__dirname, 'dist'),
    // очищает dist
    clean: true,
  },
  // htmlWebpackPlugin
  plugins: [
    // инициализируем класс и указываем объект с опциями
    new HtmlWebpackPlugin({
      // откуда собираем html
      template: './src/index.html',
    }),
    // вызов miniCSS ExtractPluguin
    new miniCSSExtractPlugin(),
  ],
  // настраиваем правила работы со стилями в модулях, т.к. исп-м css-loaders
  module: {
    // сами правила
    rules: [
      // для стилей
      {
        // проверим что файл sass, scss, css
        test: /\.(sa||sc||c)ss$/i,
        // что мы будем использовать
        // здесь важен порядок. Выполняется с самого последнего
        use: [
          miniCSSExtractPlugin.loader,
          // позволяет загружать css в js для плагина minicssextractor
          'css-loader',
          // добавит префиксы
          'postcss-loader',
          // из scss или sass делаем css
          'sass-loader',
        ],
      },

    ],
  },
}