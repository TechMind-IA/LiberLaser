'use strict'

const { Resend } = require('resend')

module.exports = {
  init(providerOptions, settings) {
    const resend = new Resend(providerOptions.apiKey)

    return {
      async send(options) {
        try {
          const result = await resend.emails.send({
            from: settings.defaultFrom,  // sempre usa o defaultFrom, ignora o que o Strapi passa
            to: options.to,
            subject: options.subject,
            html: options.html ?? options.text ?? '',
          })
          console.log('[Resend] resultado:', JSON.stringify(result))
        } catch (err) {
          console.error('[Resend] erro:', err)
        }
      }
    }
  },
}
