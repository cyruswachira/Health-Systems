// postcss.config.cjs
module.exports = {
    plugins: [
      require('@tailwindcss/postcss7-compat'), // Tailwind CSS plugin
      require('autoprefixer'),
    ],
  };
  