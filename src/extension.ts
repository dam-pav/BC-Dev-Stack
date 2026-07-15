import * as vscode from 'vscode';

const OPTIONAL_EXTENSIONS = [
  {
    id: 'vjeko.vjeko-al-objid',
    label: 'AL Object ID Ninja'
  },
  {
    id: 'jeremyvyska.bc-code-intelligence',
    label: 'BC Code Intelligence'
  }
] as const;

const REVIEWED_KEY = 'optionalExtensionsReviewed';

async function reviewOptionalExtensions(): Promise<void> {
  const extensionList = OPTIONAL_EXTENSIONS
    .map((extension) => `• ${extension.label} (${extension.id})`)
    .join('\n');

  const choice = await vscode.window.showInformationMessage(
    `Business Central Developer's Stack installs these optional extensions in a disabled-by-default role. VS Code does not allow extension packs to disable other extensions automatically. Disable any you do not want from the Extensions view:\n\n${extensionList}`,
    { modal: true },
    'Open Extensions'
  );

  if (choice === 'Open Extensions') {
    await vscode.commands.executeCommand(
      'workbench.extensions.search',
      OPTIONAL_EXTENSIONS.map((extension) => `@id:${extension.id}`).join(' ')
    );
  }
}

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('bcDevStack.reviewOptionalExtensions', reviewOptionalExtensions)
  );

  if (!context.globalState.get<boolean>(REVIEWED_KEY, false)) {
    void reviewOptionalExtensions().finally(() =>
      context.globalState.update(REVIEWED_KEY, true)
    );
  }
}

export function deactivate(): void {
  // No resources to release.
}
