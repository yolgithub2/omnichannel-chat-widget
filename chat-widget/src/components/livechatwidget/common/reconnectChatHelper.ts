import "regenerator-runtime/runtime";

import { LogLevel, TelemetryEvent } from "../../../common/telemetry/TelemetryConstants";

import { Constants } from "../../../common/Constants";
import { ConversationState } from "../../../contexts/common/ConversationState";
import { Dispatch } from "react";
import { ILiveChatWidgetAction } from "../../../contexts/common/ILiveChatWidgetAction";
import { ILiveChatWidgetProps } from "../interfaces/ILiveChatWidgetProps";
import { IReconnectChatContext } from "../../reconnectchatpanestateful/interfaces/IReconnectChatContext";
import { IReconnectChatOptionalParams } from "../../reconnectchatpanestateful/interfaces/IReconnectChatOptionalParams";
import { LiveChatWidgetActionType } from "../../../contexts/common/LiveChatWidgetActionType";
import { TelemetryHelper } from "../../../common/telemetry/TelemetryHelper";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getChatReconnectContext = async (chatSDK: any, reconnectId?: string) => {
    try {
        if (reconnectId) {
            const chatReconnectOptionalParams: IReconnectChatOptionalParams = {
                reconnectId: reconnectId
            };
            return await chatSDK?.getChatReconnectContext(chatReconnectOptionalParams);
        } else {
            return await chatSDK?.getChatReconnectContext();
        }
    } catch (ex) {
        TelemetryHelper.logSDKEvent(LogLevel.ERROR, {
            Event: TelemetryEvent.GetChatReconnectContextSDKCallFailed,
            ExceptionDetails: {
                exception: ex
            }
        });
    }
    return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getReconnectIdForAuthenticatedChat = async (props: ILiveChatWidgetProps, chatSDK: any) => {
    if (props.reconnectChatPaneProps?.isReconnectEnabled
        && props.reconnectChatPaneProps?.authClientFunction
    // TODO: Implement this after storage is in place
    /* && !isLoadWithState() */) {
        const previousActiveSessionResponse: IReconnectChatContext = await getChatReconnectContext(chatSDK);
        if (previousActiveSessionResponse && previousActiveSessionResponse.reconnectId) {
            return previousActiveSessionResponse.reconnectId;
        }
    }
    return undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleUnauthenticatedReconnectChat = async (dispatch: Dispatch<ILiveChatWidgetAction>, reconnectId: string, initStartChat: any) => {
    const reconnectAvailabilityResponse: IReconnectChatContext = await getChatReconnectContext(reconnectId);
    if (reconnectAvailabilityResponse && reconnectAvailabilityResponse.redirectURL) {
        redirectPage(reconnectAvailabilityResponse.redirectURL);
    } else {
        const optionalParams = { reconnectId: reconnectId };
        dispatch({ type: LiveChatWidgetActionType.SET_RECONNECT_ID, payload: reconnectId });
        dispatch({ type: LiveChatWidgetActionType.SET_CONVERSATION_STATE, payload: ConversationState.Loading });
        await initStartChat(optionalParams);
    }
};

const redirectPage = (newUrl: string) => {
    const data = {
        messageName: Constants.redirectPageRequest,
        newUrl: newUrl
    };
    window.parent.postMessage(data, "*");
};

export { getReconnectIdForAuthenticatedChat, handleUnauthenticatedReconnectChat };