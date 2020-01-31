import {
    ADD_USER_NOTIFICATION,
    MARK_AS_READ,
    ADD_ADDITIONAL_NOTIFICATION
  } from "./notificationTypes";
  
  const initialState = {
   notification: [],
   isUserNotificationsloaded:false,
   notification_count: 0,
   isNext: null
  };
  
  export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case ADD_USER_NOTIFICATION:
        return {
          ...state,
          notification: payload.data,
          isUserNotificationsloaded: true,
          notification_count:  payload.notification_count,
          isNext: payload.next
        };
        case MARK_AS_READ:
          return {
            ...state,
            notification_count: state.notification_count - 1,
            notification: state.notification.map(each =>
              each.id === payload ? { ...each,  status: 'NotificationStatus.read' } : each
            ),
          };
          case ADD_ADDITIONAL_NOTIFICATION:
            return {
              ...state,
               notification: [...state.notification, ...payload.data],
               isNext: payload.next
            };
      default:
        return state;
    }
  }
  