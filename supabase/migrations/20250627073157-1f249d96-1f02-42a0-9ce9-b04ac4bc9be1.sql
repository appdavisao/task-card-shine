
-- Let's check the current state of Day 7 content for all users to see if the migration was applied correctly
SELECT 
    user_id,
    title,
    content_card->'how_to_structure' as how_to_structure,
    content_card->'video_structure' as video_structure,
    content_card->'viral_tips' as viral_tips,
    content_card->'examples' as examples,
    content_card->'engagement_benefits' as engagement_benefits
FROM user_daily_content 
WHERE day = 7
LIMIT 5;

-- Also let's make sure the migration actually updated all records by checking the count
SELECT COUNT(*) as total_day7_records FROM user_daily_content WHERE day = 7;

-- And verify if any records are missing the enhanced fields
SELECT 
    COUNT(*) as records_with_enhanced_content
FROM user_daily_content 
WHERE day = 7 
AND content_card->'how_to_structure' IS NOT NULL
AND content_card->'video_structure' IS NOT NULL
AND content_card->'viral_tips' IS NOT NULL;
