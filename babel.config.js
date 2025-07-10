/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo']
    };
};