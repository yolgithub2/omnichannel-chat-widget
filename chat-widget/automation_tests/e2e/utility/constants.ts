export enum CustomLiveChatWidgetConstants {
  CustomLiveChatWidgetFilePath = "customlivechatwidgets/CustomLiveChatWidget.html",
  LiveChatButtonId = "#oc-lcw-chat-button-title",
  ProactiveChatId = "#oc-lcw-proactivechat",
  DefaultTimeout = 1000,
}

export enum TimeoutConstants {
  OneMinTimeout = 60000
}

export const DiagnosticData = [
    "timestamp",
    "activeProviderName",
    "ClientUrl",
    "AppUrl",
    "OrgLcid",
    "OrgUniqueName",
    "OrgId",
    "UserLcid",
    "UserRoles",
    "crmVersion",
    "TenantId",
    "ocApiUrl",
    "conversationId",
    "sessionId",
    "conversationType",
    "transactionParameters",
    "liveWorkItemId",
    "channelId",
];

export const stringFormat = (str: string, ...args: any[]) =>
    str.replace(/{(\d+)}/g, (match, index) => args[index].toString() || "");
