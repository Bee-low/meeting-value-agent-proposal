export function getConfig() {
  return {
    port: Number(process.env.PORT || 3978),
    MicrosoftAppId: process.env.MicrosoftAppId || '',
    MicrosoftAppPassword: process.env.MicrosoftAppPassword || '',
    MicrosoftAppType: process.env.MicrosoftAppType || 'MultiTenant',
    MicrosoftAppTenantId: process.env.MicrosoftAppTenantId || '',
    graphTenantId: process.env.GRAPH_TENANT_ID || '',
    graphClientId: process.env.GRAPH_CLIENT_ID || '',
    graphClientSecret: process.env.GRAPH_CLIENT_SECRET || '',
    azureOpenAiEndpoint: process.env.AZURE_OPENAI_ENDPOINT || '',
    azureOpenAiDeployment: process.env.AZURE_OPENAI_DEPLOYMENT || '',
    azureOpenAiApiKey: process.env.AZURE_OPENAI_API_KEY || '',
  };
}
