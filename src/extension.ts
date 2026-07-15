import * as vscode from 'vscode';

const OPTIONAL_EXTENSIONS = [
  'vjeko.vjeko-al-objid',
  'jeremyvyska.bc-code-intelligence'
] as const;

const REVIEWED_KEY = 'optionalExtensionsReviewed';

async function reviewOptionalExtensions(): Promise<void> {
  const installed = OPTIONAL_EXTENSIONS.filter((id) => vscode.extensions.getExtension(id));
  const extensionList = (installed.length > 0 ? installed : OPTIONAL_EXTENSIONS)
    .map((id) => `• ${id}`)
    .join('\n');

  await vscode.window.showInformationMessage(
    `Business Central Developer's Stack installs these optional extensions in a disabled-by-default role. VS Code does not allow extension packs to disable other extensions automatically. Disable any you do not want from the Extensions view:\n\n${extensionList}`,
    { modal: true },
    'Open Extensions'
  ).then(async (choice) => {
    if (choice === 'Open Extensions') {
      await vscode.commands.executeCommand(
        'workbench.extensions.search',
        `@installed ${OPTIONAL_EXTENSIONS.join(' ')}`
      );
    }
  });
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
