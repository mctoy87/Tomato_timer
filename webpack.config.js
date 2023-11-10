// path позволяет расчитывать пути правильно
const path = require('path');
// подключим HTML Webpack плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
// подключим miniCSS ExtractPluguin
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

// сохраняем переменную NODE c защитой
const mode = process.env.NODE_ENV || 'development';

// настроить автопрефиксер
// если dev-сборка то значение по умолчанию, иначе browserslist (см.target в доках)
const target = mode === 'development' ? 'web' : 'browserslist';
// чтобы не создавать sourcemap в build режиме
const devtool = mode === 'development' ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  // использовать sourceMap
  devtool,
  devServer: {
    // перезагружает страницу при изменениях
    hot: true,
  },
  // входной путь === index.js и установим babel polyfil для кроссбраузерности
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    // выходной файл index.js задаем ему имя с хэшем
    filename: '[name][contenthash].js',
    // куда складывать готовые файлы (dirname - до текущей директории)
    path: path.resolve(__dirname, 'dist'),
    // очищает dist
    clean: true,
    // задаем  имя с хэшем для картинок и шрифтов.
    // Эти значения в настройках webpack
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  // htmlWebpackPlugin
  plugins: [
    // инициализируем класс и указываем объект с опциями
    new HtmlWebpackPlugin({
      // откуда собираем html
      template: './src/index.html',
    }),
    // вызов miniCSS ExtractPluguin
    new MiniCSSExtractPlugin({
      // задаем в настройках имя с хэшем
      filename: '[name][contenthash].css',
    }),
  ],
  // настраиваем правила работы со стилями в модулях, т.к. исп-м css-loaders
  module: {
    // сами правила
    rules: [
      // для html
      {
        // проверим все html файлы
        test: /\.html$/i,
        // исп-ть html-loader. Ниже исп-ся use т.к. несколько лоадеров
        loader: 'html-loader',
      },
      // для стилей
      {
        // проверим что файл sass, scss, css
        test: /\.(sa|sc|c)ss$/i,
        // что мы будем использовать
        // здесь важен порядок. Выполняется с самого последнего
        use: [
          MiniCSSExtractPlugin.loader,
          // позволяет загружать css в js для плагина minicssextractor
          'css-loader',
          // добавит префиксы
          'postcss-loader',
          // из scss или sass делаем css
          'sass-loader',
        ],
      },
      // для картинок
      {
        // проверяем формат картинок
        test: /\.(jpg|jpeg|png|svg|gif)$/i,
        type: 'asset/resource',
      },
      // для шрифтов
      {
        // проверяем формат шрифтов
        test: /\.(woff2|woff|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // для babel
      {
        // проверяем что это js файлы либо mjs(для модулей)
        test: /\.m?js$/,
        // исключить другие библиотеки чтобы не прогонять через babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // для избежания лишней рекомпиляции при каждом запуске
            cacheDirectory: true,
          },
        },
      },
    ],
  },
};
