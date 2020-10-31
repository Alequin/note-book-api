import { query } from "../query";

export const readRandomFlashCard = async ({ tags } = {}) =>
  (tags ? queryWithTags(tags) : queryWithoutTags()).then(
    (flashCards) => flashCards[0] || null,
  );

const queryWithoutTags = async () =>
  query(`
SELECT 
  id, question_html, answer_html, tags 
FROM 
  public.flash_cards 
OFFSET 
  floor(random() * (SELECT COUNT(*) FROM public.flash_cards ))
LIMIT 
  1;`);

const queryWithTags = async (tags) =>
  query(
    `
  SELECT 
    id, question_html, answer_html, tags 
  FROM 
    public.flash_cards 
  WHERE 
    tags @> $1
  OFFSET 
    floor(random() * (SELECT COUNT(*) FROM public.flash_cards WHERE tags @> $1  ))
  LIMIT 
    1;
  `,
    [`{${tags}}`],
  );
