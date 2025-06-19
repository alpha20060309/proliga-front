/* eslint-disable no-undef */
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing Supabase credentials in environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchAndWriteLocales() {
  try {
    const { data, error } = await supabase
      .from('system_language')
      .select('id, name, ru, uz, is_exclude')
      .is('deleted_at', null)
      .order('id');

    if (error) {
      throw error;
    }

    const uz = {};
    const ru = {};
    data.forEach((item) => {
      if (!item?.is_exclude) {
        uz[item.name] = item.uz;
        ru[item.name] = item.ru;
      }
    });

    const localesDir = path.join(process.cwd(), 'public', 'locales');
    await fs.mkdir(localesDir, { recursive: true });
    await fs.writeFile(path.join(localesDir, 'uz.json'), JSON.stringify(uz, null, 2), 'utf8');
    await fs.writeFile(path.join(localesDir, 'ru.json'), JSON.stringify(ru, null, 2), 'utf8');

    console.log('Locales updated successfully!');
  } catch (err) {
    console.error('Error updating locales:', err.message || err);
    process.exit(1);
  }
}

fetchAndWriteLocales();
