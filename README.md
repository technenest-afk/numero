React + TypeScript + Vite
Esta plantilla proporciona una configuración mínima para que React funcione en Vite con HMR (Hot Module Replacement) y algunas reglas de ESLint.

Actualmente, hay dos complementos (plugins) oficiales disponibles:

@vitejs/plugin-react utiliza Babel (o oxc cuando se usa en rolldown-vite) para Fast Refresh.

@vitejs/plugin-react-swc utiliza SWC para Fast Refresh.

React Compiler
El React Compiler no está habilitado en esta plantilla debido a su impacto en el rendimiento de desarrollo y compilación (build). Para añadirlo, consulta esta documentación.

Expandiendo la configuración de ESLint
Si estás desarrollando una aplicación de producción, recomendamos actualizar la configuración para habilitar reglas de linting con conocimiento de tipos (type-aware):

JavaScript
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Otras configuraciones...

      // Elimina tseslint.configs.recommended y reemplázalo por esto
      tseslint.configs.recommendedTypeChecked,
      // Alternativamente, utiliza esto para reglas más estrictas
      tseslint.configs.strictTypeChecked,
      // Opcionalmente, añade esto para reglas estilísticas
      tseslint.configs.stylisticTypeChecked,

      // Otras configuraciones...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // otras opciones...
    },
  },
])
También puedes instalar eslint-plugin-react-x y eslint-plugin-react-dom para reglas de lint específicas de React:

JavaScript
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Otras configuraciones...
      // Habilita reglas de lint para React
      reactX.configs['recommended-typescript'],
      // Habilita reglas de lint para React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // otras opciones...
    },
  },
])
