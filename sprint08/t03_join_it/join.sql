USE ucode_web;
SELECT h.name, t.name FROM heroes h LEFT JOIN teams t ON h.id = t.hero_id;
SELECT h.name, p.name FROM heroes h RIGHT JOIN powers p ON h.id = p.hero_id;
SELECT h.name, p.name, t.name
FROM heroes h
  JOIN powers p ON h.id = p.hero_id
  JOIN teams t ON h.id = t.hero_id;