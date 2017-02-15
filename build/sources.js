module.exports = {
  dist: 'dist',
  dist_src: 'dist/src',
  scripts: {
    main: 'public/src/index.js',
    all: 'public/src/**/*.js',
    main_dist: 'bundler.js',
  },
  styles: {
    main: 'public/sass/styles.scss',
    all: 'public/sass/**/**.scss'
  },
  templates: {
    all: 'public/**/*.html'
  },
  img: {
    all: ['public/**/*.png', 'public/**/*.jpg']
  }
};