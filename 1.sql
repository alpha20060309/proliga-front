CREATE OR REPLACE FUNCTION http__refresh_token()
RETURNS void AS $$
DECLARE
    response http_response;
    json_response json;
    token text;
    status INT;
    bearer_token text := (select value from system_config where key::varchar = 'eskiz_token');
BEGIN
    SET search_path TO public, auth, extensions;
    
    response := format(
        '%s',
        http(('PATCH',
            'https://notify.eskiz.uz/api/auth/refresh',
            ARRAY[http_header('Authorization', bearer_token)],
            'application/json',
            ''
        )::http_request)
    );

    RAISE NOTICE 'Response: %', response.status;
    
    IF response.status BETWEEN 200 AND 299 THEN
        json_response := response.content::json;
        token := json_response->'data'->>'token';
        UPDATE system_config SET value='Bearer '||token WHERE "key"='eskiz_token';
        RAISE NOTICE 'Muvaffaqiyatli: Token: %', token;
    ELSE
        RAISE NOTICE 'Xatolik: %', response.content;
    END IF;
END;
$$ LANGUAGE plpgsql;
