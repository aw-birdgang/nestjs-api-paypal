export const PAYPAL_AXIOS_INSTANCE_TOKEN = 'paypal_axios_instance_token';
export const PAYPAL_AUTHORIZATION_SERVICE_INSTANCE_TOKEN = 'paypal_authorization_service_token';
export const PAYPAL_PAYMENT_SERVICE_INSTANCE_TOKEN = 'paypal_payment_service_token';
export const PAYPAL_UTILS_SERVICE_INSTANCE_TOKEN = 'paypal_utils_service_token';
export const PAYPAL_MODULE_OPTIONS = 'paypal_module_options';
export const PAYPAL_AUTHORIZATION_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded'
};
export const PAYPAL_TRANSACTIONS_HEADERS = {
  'X-PAYPAL-SECURITY-CONTEXT': '{"version":"1.2","actor":{"client_id":"AU67ewLFkviOMY6i9-e-xtDS2gCxhQXHL42yZLfbUu0wT1RQojFo-IXG92wv0hAaZ2ore6grSgmj1VcQ","id":"35740404","auth_claims":["CLIENT_ID_SECRET"],"auth_state":"LOGGEDIN","account_number":"1480460762532829633","encrypted_account_number":"JVH3C98SC4E84","party_id":"1480460762532829633","user_type":"API_CALLER"},"auth_token_type":"ACCESS_TOKEN","scopes":["https://uri.paypal.com/services/reporting/search/read"],"client_id":"AU67ewLFkviOMY6i9-e-xtDS2gCxhQXHL42yZLfbUu0wT1RQojFo-IXG92wv0hAaZ2ore6grSgmj1VcQ","app_id":"APP-80W284485P519543T","claims":{"actor_payer_id":"JVH3C98SC4E84","internal_application":"false"},"subjects":[{"subject":{"id":"35762049","auth_claims":["PAYER_ID"],"auth_state":"IDENTIFIED","account_number":"1256692217768566521","encrypted_account_number":"XZXSPECPDZHZU","party_id":"2277051500535724448","user_type":"MERCHANT"},"features":[]}]}',
  'Content-Type': 'application/json'
};

