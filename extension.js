const zed = require('zed');

class GlootieExtension {
  constructor() {
    this.isActive = false;
    this.assistantEnabled = false;
    this.state = {};
  }

  async activate(context) {
    this.isActive = true;
    this.registerCommands();
    this.setupAssistant();
    this.setupLanguages();
  }

  registerCommands() {
    zed.commands.register('glootie:activate', () => {
      this.isActive = true;
      zed.notifications.show('info', 'Glootie activated');
    });
    zed.commands.register('glootie:deactivate', () => {
      this.isActive = false;
      zed.notifications.show('info', 'Glootie deactivated');
    });
    zed.commands.register('glootie:showState', () => {
      zed.panels.show('glootie.state', { focused: true });
    });
    zed.commands.register('glootie:toggleAssistant', () => {
      this.assistantEnabled = !this.assistantEnabled;
      const status = this.assistantEnabled ? 'enabled' : 'disabled';
      zed.notifications.show('info', `AI Assistant ${status}`);
    });
  }

  setupAssistant() {
    zed.assistant.onRequest(async (context) => {
      if (!this.isActive || !this.assistantEnabled) return null;
      return {
        model: zed.config.get('glootie.llm'),
        messages: context.messages,
        temperature: zed.config.get('glootie.temperature', 0.7)
      };
    });
  }

  setupLanguages() {
    const config = zed.config.get('glootie.languages', {});
    Object.entries(config).forEach(([lang, enabled]) => {
      if (enabled) {
        zed.languages.register(lang, {
          name: lang,
          capabilities: { completion: true, diagnostics: true }
        });
      }
    });
  }

  deactivate() {
    this.isActive = false;
  }
}

let glootie;
exports.activate = async (context) => {
  glootie = new GlootieExtension();
  await glootie.activate(context);
};
exports.deactivate = () => glootie && glootie.deactivate();
