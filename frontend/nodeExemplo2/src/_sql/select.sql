SELECT * FROM personas;

SELECT * FROM chat_history ORDER BY id ASC;

SELECT * FROM note_categories ORDER BY id ASC;

SELECT * FROM notes ORDER BY id ASC;

---------------

SELECT
    n.id,
    c.name AS category,
    n.title,
    n.content,
    n.created_at,
    n.updated_at
FROM notes n
LEFT JOIN note_categories c
    ON c.id = n.category_id
ORDER BY n.id ASC;

---------------

SELECT
    n.id,
    c.name AS category,
    n.title,
    n.content
FROM notes n
LEFT JOIN note_categories c
    ON c.id = n.category_id
WHERE c.name IN (
    'profile',
    'preference',
    'memory',
    'summary',
    'goal',
    'fact'
)
ORDER BY n.id ASC;

---------------

SELECT 'PERSONAS' AS source,
       CAST(id AS TEXT) AS id,
       name,
       system_prompt AS content
FROM personas

UNION ALL

SELECT 'CHAT_HISTORY' AS source,
       CAST(id AS TEXT) AS id,
       role AS name,
       content
FROM chat_history

UNION ALL

SELECT 'NOTES' AS source,
       CAST(n.id AS TEXT) AS id,
       n.title AS name,
       n.content
FROM notes n

ORDER BY source, id;

---------------