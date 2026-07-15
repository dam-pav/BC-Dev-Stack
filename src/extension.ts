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
    'Choose Extension'
  );

  if (choice !== 'Choose Extension') {
    return;
  }

  const selected = await vscode.window.showQuickPick(
    OPTIONAL_EXTENSIONS.map((extension) => ({
      label: extension.label,
      description: extension.id,
      detail: vscode.extensions.getExtension(extension.id)
        ? 'Installed — open this extension to enable or disable it'
        : 'Installation may still be completing'
    })),
    {
      title: "Business Central Developer's Stack: Review Optional Extensions",
      placeHolder: 'Choose an extension to open; run the command again to review the other one'
    }
  );

  if (selected) {
    await vscode.commands.executeCommand(
      'workbench.extensions.search',
      `@id:${selected.description}`
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
