// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/no-multiple-template-root': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: 3 }],

    //
    // ---------------------------------------------
    // ⭐ STYLISTIC: Ein schönes, modernes Regelset ⭐
    // ---------------------------------------------
    //

    // 2 Leerzeichen pro Einrückung
    '@stylistic/indent': ['error', 2],

    // Einzelne Anführungszeichen
    '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],

    // Keine Semikolons (moderner Stil)
    '@stylistic/semi': ['error', 'never'],

    // Kommas am Ende von Listen/Objekten
    '@stylistic/comma-dangle': ['error', {
      arrays: 'only-multiline',
      objects: 'only-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never'
    }],

    // Konsistente Objekt-Formatter
    '@stylistic/object-curly-spacing': ['error', 'always'],

    // Entferne unnötige Leerzeichen am Zeilenende
    '@stylistic/no-trailing-spaces': 'error',

    // Leere Zeilen kontrollieren
    '@stylistic/padded-blocks': ['error', {
      blocks: 'never',
      classes: 'never',
      switches: 'never'
    }],

    // Leere Zeile am Ende der Datei
    '@stylistic/eol-last': ['error', 'always'],

    // Leerzeichen vor geschweiften Klammern
    '@stylistic/space-before-blocks': ['error', 'always'],

    // Konsistenter Abstand um Operatoren
    '@stylistic/space-infix-ops': 'error',

    // Leerzeichen in Klammern?
    '@stylistic/space-in-parens': ['error', 'never'],

    // Pfeilfunktion Leerraum
    '@stylistic/arrow-spacing': ['error', { before: true, after: true }],

    // Klammern um Arrow-Function-Parameter (schön & konsistent)
    '@stylistic/arrow-parens': ['error', 'always'],

    // Kontrollfluss (if/for/while) verlangt Leerzeichen danach
    '@stylistic/keyword-spacing': ['error', { before: true, after: true }],

    //
    // Vue-spezifische Stylistic-Regeln
    //

    // Einrückung im <template>
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: false,
      ignores: []
    }],

    // Zeilenformatierung für inline HTML
    'vue/singleline-html-element-content-newline': 'off',

    // Erzwinge Self-Closing Tag für Komponenten
    'vue/html-self-closing': ['error', {
      html: {
        void: 'never',
        normal: 'never',
        component: 'always'
      }
    }]
  }
})
