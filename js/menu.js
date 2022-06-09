function init_zoom(g) {
  z = getCookie('z_'+g);
  document.getElementById('zoom').value = z;
  if (z == "" || z == '100') zoom = 'none';
  else zoom = 'scale('+(Number(z)/100)+')';
  document.getElementById('zoom_zone').style.transform = zoom;
  document.getElementById('zoom').title = 'Niveau de zoom : ' + z;
}

function set_zoom(z,g) {
  console.log('z = '+z+', g = '+g);
  if (z == '100') zoom = 'none';
  else zoom = 'scale('+(Number(z)/100)+')';
  document.getElementById('zoom_zone').style.transform = zoom;
  document.getElementById('zoom').title = 'Niveau de zoom : ' + z;
  createCookie('z_'+g, z, 365)
}
 
var cnt = 0; 
var timer;
var timerTxt = '0s';
var strt = new Date().getTime();
var playPause = true;
var timeScore;
var aired;
var n_aired;

var playList = [
  //{ title : "Airship Thunderchild",           auth : "Otto Halmen",           lic : "(CC):BY",       next:0, url : "https://ia801309.us.archive.org/34/items/auboutdufil-archives/482/OttoHalmn-OttosCreativeCommonsTracks-01AirshipThunderchild.mp3" },
  //{ title : "Long Time Expected",             auth : "Zweeback",              lic : "(CC):BY-NC-SA", next:0, url : "https://ia801309.us.archive.org/34/items/auboutdufil-archives/479/Zweeback-GoodLuckPotato-01LongTimeExpected.mp3" },
  //{ title : "The Time To Run",                auth : "Dexter Britain",        lic : "(CC):BY-NC-SA", next:0, url : "http://ia801309.us.archive.org/34/items/auboutdufil-archives/476/Dexter_Britain_-_01_-_The_Time_To_Run_Finale.mp3" },
  //{ title : "Petit pantin au coeur de glace", auth : "Laei",                  lic : "(CC):BY",       next:0, url : "http://download.tuxfamily.org/lacrymosa/albums/eponymeI/04-petit_pantin_au_coeur_de_glace-eponyme_I-laei-copyleft.mp3" },
  //{ title : "Talk to me",                     auth : " Miranda Shvangiradze", lic : "(CC):BY-NC-NO", next:0, url : "http://ia800708.us.archive.org/28/items/Vkrsnl038MirandaShvangiradzeTalkToMeEp/2TalkToMe.mp3" },
  //{ title : "The Jam",                        auth : "General Fuzz",          lic : "(CC):BY-NC-SA", next:0, url : "http://www.generalfuzz.net/mp3/Miles%20Tones/the%20jam.mp3" },
  //{ title : "Petite valse",                   auth : "Domenico Curcio",       lic : "(CC):BY-NC-SA", next:0, url : "http://www.auboutdufil.com/audio/music_409.mp3" },
  //{ title : "To love and hold",               auth : "Simply Wiggins",        lic : "(CC):BY-NC-SA", next:0, url : "http://www.auboutdufil.com/audio/music_341.mp3" },
  //{ title : "Hope and Faith",                 auth : "Jimouze",               lic : "(CC):BY-NC-SA", next:0, url : "http://ia800809.us.archive.org/23/items/jamendo-002126/01.mp3" },
  //{ title : "Down",                           auth : "David Schombert",       lic : "(CC):BY-NC-NO", next:0, url : "http://ia800800.us.archive.org/20/items/jamendo-000709/02.mp3" },
  //{ title : "Temporal distorsion",            auth : "J T Bruce",             lic : "(CC):BY-NC-NO", next:0, url : "http://ia800500.us.archive.org/29/items/JTBruceAnomalousMaterial/Temporal_Distortion.mp3" },
  //{ title : "Message from planet earth",      auth : "Peacespeaker",          lic : "(CC):BY-NC-NO", next:0, url : "https://ia800807.us.archive.org/7/items/jamendo-029352/03.mp3" },
  //{ title : "Wind of Hope",                   auth : "Symheris",              lic : "(CC):BY-N0",    next:0, url : "http://www.symheris.com/music/Symheris-Winds_Of_Hope.mp3" },
  //{ title : "A simple love",                  auth : "Symheris",              lic : "(CC):BY-NO",    next:0, url : "http://www.symheris.com/music/Symheris-A_Simple_Love.mp3" },
  { title : "Brandenburg Concerto No. 1 in F major BWV 1046 - 1. Allegro",               auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/f/f4/Bach_-_Brandenburg_Concerto_No._1_-_1._Allegro.ogg" },
  { title : "Brandenburg Concerto No. 1 in F major BWV 1046 - 2. Adagio in D minor",     auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/1/1f/Bach_-_Brandenburg_Concerto.No.1_in_F_Major-_II._Adagio.ogg" },
  { title : "Brandenburg Concerto No. 1 in F major BWV 1046 - 3. Allegro",               auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/1/18/Bach_-_Brandenburg_Concerto.No._1_in_F_Major-_III._Allegro.ogg" },
  { title : "Brandenburg Concerto No. 1 in F major BWV 1046 - 4. Menuet",                auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/9/95/Bach_-_Brandenburg_Concerto.No.1_in_F_Major-_IV._Menuetto%3B_Trio_1%3B_Menuetto%3B_Polacca%3B_Menuetto_and_Trio.ogg" },
  { title : "Brandenburg Concerto No. 2 in F major BWV 1047 - 1. Allegro",               auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/d/d5/Bach_-_Brandenburg_Concerto.No._2_in_F_Major-_I._Allegro.ogg" },
  { title : "Brandenburg Concerto No. 2 in F major BWV 1047 - 2. Andante in D minor",    auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/a/a0/Bach_-_Brandenburg_Concerto_No._2_in_F_Major-_II._Andante.ogg" },
  { title : "Brandenburg Concerto No. 2 in F major BWV 1047 - 3. Allegro assai",         auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/2/26/Bach_-_Brandenburg_Concerto_No._2_in_F_Major-_III._Allegro_assai.ogg" },
  { title : "Brandenburg Concerto No. 3 in G major BWV 1048 - 1. Allegro ",              auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/b/b0/Bach_-_Brandenburg_Concerto_No._3_-_1._Allegro.ogg" },
  { title : "Brandenburg Concerto No. 3 in G major BWV 1048 - 2. Adagio in E minor",     auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/7/78/Bach_-_Brandenburg_Concerto_No._3_-_2._Adagio.ogg" },
  { title : "Brandenburg Concerto No. 3 in G major BWV 1048 - 3. Allegro",               auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/c/ca/Bach_-_Brandenburg_Concerto_No._3_-_3._Allegro.ogg" },
  { title : "Brandenburg Concerto No. 4 in G major BWV 1049 - 1. Allegro",               auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/3/3b/Brandenburg_Concerto_No._4_in_G%2C_Movement_I_%28Allegro%29%2C_BWV_1049_%28ISRC_USUAN1100303%29.oga" },
  { title : "Brandenburg Concerto No. 4 in G major BWV 1049 - 2. Andante in E minor",    auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/b/b9/Bach_-_Brandenburg_ConcertoNo._4_in_G_Major-_II._Andante.ogg" },
  { title : "Brandenburg Concerto No. 4 in G major BWV 1049 - 3. Presto",                auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/2/26/Bach_-_Brandenburg_Concerto.No.4_in_G_Major-_III._Presto.ogg" },
  { title : "Brandenburg Concerto No. 5 in D major BWV 1050 - 1. Allegro",               auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/6/68/Bach_-_Brandenburg_Concerto_5_-_1._Allegro.ogg" },
  { title : "Brandenburg Concerto No. 5 in D major BWV 1050 - 2. Affettuoso in B minor", auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/4/49/Bach_-_Brandenburg_Concerto_5_-_2._Affettuoso.ogg" },
  { title : "Brandenburg Concerto No. 5 in D major BWV 1050 - 3. Allegro",               auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/1/12/Bach_-_Brandenburg_Concerto_5_-_3._Allegro.ogg" },
  { title : "Brandenburg Concerto No. 6 in B major BWV 1051 - 1. Allegro",               auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/f/f3/Bach_-_Brandenburg_Concerto_6_-_1._Allegro.ogg" },
  { title : "Brandenburg Concerto No. 6 in B major BWV 1051 - 2. Adagio ma non tanto",   auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/3/37/Bach_-_Brandenburg_Concerto_6_-_2._Adagio.ogg" },
  { title : "Brandenburg Concerto No. 6 in B major BWV 1051 - 3. Allegro",               auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/6/61/Bach_-_Brandenburg_Concerto_6_-_3._Allegro.ogg" },
  { title : "Cello suite No. 1 in G major BWV 1007 - 1. Prelude",                        auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/4/43/JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_1_in_G_Prelude.ogg" },
  { title : "Cello suite No. 1 in G major BWV 1007 - 2. Allemande",                      auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/6/6c/JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_1_in_G_Allemande.ogg" },
  { title : "Cello suite No. 1 in G major BWV 1007 - 3. Courante",                       auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/0/08/JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_1_in_G_Courante.ogg" },
  { title : "Cello suite No. 1 in G major BWV 1007 - 4. Sarabande",                      auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/3/30/JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_1_in_G_Sarabande.ogg" },
  { title : "Cello suite No. 1 in G major BWV 1007 - 5. Minuet",                         auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/6/67/JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_1_in_G_Minuets.ogg" },
  { title : "Cello suite No. 1 in G major BWV 1007 - 6. Gigue",                          auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/e/e6/JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_1_in_G_Gigue.ogg" },
  { title : "Cello suite No. 2 in D minor BWV 1008 - Gigue",                             auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/2/22/Bach_Cello_Suite_BWV_1008_Gigue.ogg" },
  { title : "Cello suite No. 3 in C major BWV 1009 - 1. Prelude",                        auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/5/56/JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_3_in_C_Prelude.ogg" },
  { title : "Cello suite No. 3 in C major BWV 1009 - 2. Allemande",                      auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/4/49/JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_3_in_C_Allemande.ogg" },
  { title : "Cello suite No. 3 in C major BWV 1009 - 3. Courante",                       auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/9/9f/JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_3_in_C_Courante.ogg" },
  { title : "Cello suite No. 3 in C major BWV 1009 - 4. Sarabande",                      auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/c/c0/JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_3_in_C_Sarabande.ogg" },
  { title : "Cello suite No. 3 in C major BWV 1009 - 5. Bourees",                        auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/e/e9/JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_3_in_G_Bourees.ogg" },
  { title : "Cello suite No. 5 in C minor BWV 1010 - 6. Gigue",                          auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/b/b6/JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_3_in_C_Gigue.ogg" },
  { title : "Violin Concerto in E major BWV 1042 - 1. Allegro",                          auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/f/f6/Bach_Emaj_Violin_Concerto_-_1._Allegro.ogg" },
  { title : "Violin Concerto in E major BWV 1042 - 2. Adagio",                           auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/4/44/Bach_Emaj_Violin_Concerto_-_2._Adagio_sempre_Piano.ogg" },
  { title : "Violin Concerto in E major BWV 1042 - 3. Allegro assai",                    auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/f/f5/Bach_Emaj_Violin_Concerto_-_3._Allegro.ogg" },
  { title : "Concerto for Two Violins in D minor BWV 1043 - 1. Vivace",                  auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/e/e9/Johann_Sebastian_Bach_-_Concerto_for_Two_Violins_in_D_minor_-_1._Vivace.ogg" },
  { title : "Concerto for Two Violins in D minor BWV 1043 - 2. Allegro ma non tanto",    auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/3/38/Johann_Sebastian_Bach_-_Concerto_for_Two_Violins_in_D_minor_-_2._Largo_ma_non_tanto.ogg" },
  { title : "Concerto for Two Violins in D minor BWV 1043 - 3. Allegro",                 auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/6/68/Johann_Sebastian_Bach_-_Concerto_for_Two_Violins_in_D_minor_-_3._Allegro.ogg" },
  { title : "Harpsichord Concerto in D minor, BWV 1052- 1. Allegro",                     auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/5/5a/Johann_Sebastian_Bach_-_Klavierkonzert_d-moll_-_1._Allegro.ogg" },
  { title : "Harpsichord Concerto in D minor, BWV 1052- 2. Adagio",                      auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/d/d5/Johann_Sebastian_Bach_-_Klavierkonzert_d-moll_-_2._Adagio.ogg" },
  { title : "Harpsichord Concerto in D minor, BWV 1052- 3. Allegro",                     auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/b/b6/Johann_Sebastian_Bach_-_Klavierkonzert_d-moll_-_3._Allegro.ogg" },
  { title : "Harpsichord Concerto in E major BWV 1053 - 1. Allegro",                     auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/8/8e/Bach_Emaj_Harpsichord_Concerto_-_1.ogg" },
  { title : "Harpsichord Concerto in E major BWV 1053 - 2. Siciliano",                   auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/d/d9/Bach_Emaj_Harpsichord_Concerto_-_2._Siciliano.ogg" },
  { title : "Harpsichord Concerto in E major BWV 1053 - 3. Allegro",                     auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/7/70/Bach_Emaj_Harpsichord_Concerto_-_3._Allegro.ogg" },
  { title : "Partita in A minor for solo flute BWV 1013 - 1. Allemande",                 auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/d/de/Bach_-_Partita_For_Solo_Flute_-_Traverso_-_1._Allemande.ogg" },
  { title : "Partita in A minor for solo flute BWV 1013 - 2. Courante",                  auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/1/13/Bach_-_Partita_For_Solo_Flute_-_Traverso_-_2._Courante.ogg" },
  { title : "Partita in A minor for solo flute BWV 1013 - 3. Sarabande",                 auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/1/15/Bach_-_Partita_For_Solo_Flute_-_Traverso_-_3._Sarabande.ogg" },
  { title : "Partita in A minor for solo flute BWV 1013 - 4. Bouree",                    auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/9/97/Bach_-_Partita_For_Solo_Flute_-_Traverso_-_4._Bouree.ogg" },
  { title : "Viola da Gamba Sonata in G Major, BWV 1027 - 1. Adagio",                    auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/1/16/CELLO_LIVE_PERFORMANCES_JOHN_MICHEL-J_S_BACH_GAMBA_SONATA_in_G_1st_mvt.ogg" },
  { title : "Viola da Gamba Sonata in G Major, BWV 1027 - 2. Allegro ma non tanto",      auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/f/fc/CELLO_LIVE_PERFORMANCES_JOHN_MICHEL-J_S_Bach_Gamba_Sonata_in_G_2nd_mvt.ogg" },
  { title : "Viola da Gamba Sonata in G Major, BWV 1027 - 3. Andante",                   auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/5/57/CELLO_LIVE_PERFORMANCES_JOHN_MICHEL-J_S_Bach_Gamba_Sonata_in_G_3rd_mvt.ogg" },
  { title : "Viola da Gamba Sonata in G Major, BWV 1027 - 4. Allegro moderato",          auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/c/ce/CELLO_LIVE_PERFORMANCES_JOHN_MICHEL-J_S_Bach_Gamba_Sonata_in_G_4th_mvt.ogg" },
  { title : "Viola da Gamba Sonata in G Minor, BWV 1029 - 1. Vivace",                    auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/0/00/CELLO_LIVE_PERFORMANCES_JOHN_MICHEL-J_S_Bach_Gamba_Sonata_in_g_1st_mvt.ogg" },
  { title : "Viola da Gamba Sonata in G Minor, BWV 1029 - 2. Adagio",                    auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/e/ea/CELLO_LIVE_PERFORMANCES_JOHN_MICHEL-J_S_Bach_Gamba_Sonata_in_g_2nd_mvt.ogg" },
  { title : "Viola da Gamba Sonata in G Minor, BWV 1029 - 3. Allegro",                   auth : "Johann Sebastian Bach", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/4/49/CELLO_LIVE_PERFORMANCES_JOHN_MICHEL-J_S_Bach_Gamba_Sonata_in_g_3rd_mvt.ogg" },
  { title : "Violin Concerto No 5 in A major K219",                                      auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/d/df/Mozart_-_5th_Concerto%2C_1st_movement_%28Allegro_aperto%29.ogg" },
  { title : "Piano Sonata No. 14 K. 457 - 1. Molto Allegro",                             auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/8/86/Mozart_-_Piano_Sonata_No._14.ogg" },
  { title : "Piano Sonata No. 12 K. 332/300k - 2. Adagio",                               auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/d/d0/Mozart_-_Piano_Sonata_No._12_in_F_Major%2C_K.332_-_II._Adagio.ogg" },
  { title : "Piano Sonata No. 8 K. 310/300d  - 1. Allegro maestroso",                    auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/6/67/Mozart_Piano_Sonata_Amin1.ogg" },
  { title : "Piano Sonata No. 8 K. 310/300d  - 2. Andante cantabile con espressione",    auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/e/e7/Mozart_Piano_Sonata_Amin2.ogg" },
  { title : "Piano Sonata No. 8 K. 310/300d  - 3. Presto",                               auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/9/98/Mozart_Piano_Sonata_Amin3.ogg" },
  { title : "Piano Sonata No. 13 K. 333/315c - 1. Allegro",                              auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Wolfgang_Amadeus_Mozart_-_sonata_no._13_in_b_flat_major%2C_k.333_-_i._allegro.ogg" },
  { title : "Piano Sonata No. 13 K. 333/315c - 2. Andante cantabile",                    auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/7/78/Wolfgang_Amadeus_Mozart_-_sonata_no._13_in_b_flat_major%2C_k.333_-_ii._andante_cantabile.ogg" },
  { title : "Piano Sonata No. 13 K. 333/315c - 3. Allegretto grazioso",                  auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/1/14/Wolfgang_Amadeus_Mozart_-_sonata_no._13_in_b_flat_major%2C_k.333_-_iii._allegretto_grazioso.ogg" },
  { title : "Mozart Piano Concerto 23 in A major, K 488, 2. Adagio",                     auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/a/aa/Mozart_Piano_Concerto_23_in_A_major%2C_K_488%2C_II_Adagio._MYAC_Symphony_Orchestra%2C_Amir_Siraj.ogg" },
  { title : "Serenade No. 11 for Winds in E-flat major K. 375 - 1. Allegro maestroso",   auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/8/82/Wolfgang_Amadeus_Mozart_-_Serenade_K.375_-_1._Allegro_maestoso.ogg" },
  { title : "Serenade No. 11 for Winds in E-flat major K. 375 - 2. Menuetto",            auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/0/0d/Wolfgang_Amadeus_Mozart_-_Serenade_K.375_-_2._Menuetto.ogg" },
  { title : "Serenade No. 11 for Winds in E-flat major K. 375 - 3. Adagio",              auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/8/8a/Wolfgang_Amadeus_Mozart_-_Serenade_K.375_-_3._Adagio.ogg" },
  { title : "Serenade No. 11 for Winds in E-flat major K. 375 - 3. Menuetto",            auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/2/27/Wolfgang_Amadeus_Mozart_-_Serenade_K.375_-_4._Menuetto.ogg" },
  { title : "Serenade No. 11 for Winds in E-flat major K. 375 - 3. Allegro",             auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/1/16/Wolfgang_Amadeus_Mozart_-_Serenade_K.375_-_5._Allegro.ogg" },
  { title : "Quintet in A major for Clarinet and Strings, K. 581 - 1. Allegro",          auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Wolfgang_Amadeus_Mozart_-_Clarinet_Quintet_-_1._Allegro.ogg" },
  { title : "Quintet in A major for Clarinet and Strings, K. 581 - 2. Larghetto",        auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/6/60/Wolfgang_Amadeus_Mozart_-_Clarinet_Quintet_-_2._Larghetto.ogg" },
  { title : "Quintet in A major for Clarinet and Strings, K. 581 - 3. Menuetto",         auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/d/d2/Wolfgang_Amadeus_Mozart_-_Clarinet_Quintet_-_3._Menuetto.ogg" },
  { title : "Quintet in A major for Clarinet and Strings, K. 581 - 1. Allegretto con variazioni", auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/b/b2/Wolfgang_Amadeus_Mozart_-_Clarinet_Quintet_-_4._Allegretto_con_variazioni.ogg" },
  { title : "Flute Quartet No. 1 in D major, K. 285 - 1. Allegro",                       auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/9/9c/Wolfgang_Amadeus_Mozart_-_Flute_Quartet_No._1_in_D_Major_-_1._Allegro.ogg" },
  { title : "Flute Quartet No. 1 in D major, K. 285 - 2. Adagio",                        auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/2/2a/Wolfgang_Amadeus_Mozart_-_Flute_Quartet_No._1_in_D_Major_-_2._Adagio.ogg" },
  { title : "Flute Quartet No. 1 in D major, K. 285 - 3. Rondeau",                       auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/e/e0/Wolfgang_Amadeus_Mozart_-_Flute_Quartet_No._1_in_D_Major_-_3._Rondeau_-_Allegro.ogg" },
  { title : "Oboe Quartet in F major, K. 370/368b - 1. Allegro",                         auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/a/a6/Wolfgang_Amadeus_Mozart_-_Oboe_Quartet_-_1._Allegro.ogg" },
  { title : "Oboe Quartet in F major, K. 370/368b - 2. Adagio",                          auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/e/ee/Wolfgang_Amadeus_Mozart_-_Oboe_Quartet_-_2._Adagio.ogg" },
  { title : "Oboe Quartet in F major, K. 370/368b - 3. Rondeau allegro",                 auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/4/44/Wolfgang_Amadeus_Mozart_-_Oboe_Quartet_-_3._Rondeau_-_Allegro.ogg" },
  { title : "Symphony No. 36 in C major, K. 425 - 1. Allegro",                           auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/5/57/Mozart_Symphony_36_KV_425_Linz_1.oga" },
  { title : "Symphony No. 36 in C major, K. 425 - 2. Andante",                           auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/3/37/Mozart_Symphony_36_KV_425_Linz_2.oga" },
  { title : "Symphony No. 36 in C major, K. 425 - 3. Menuetto",                          auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/c/c6/Mozart_Symphony_36_KV_425_Linz_3.oga" },
  { title : "Symphony No. 36 in C major, K. 425 - 4. Finale (Presto)",                   auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/c/ca/Mozart_Symphony_36_KV_425_Linz_4.oga" },
  { title : "String Quintet No. 4 in G minor, K. 516 - 1. Allegro",                      auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/8/87/Wolfgang_Amadeus_mozart_-_String_Quintet_No._4_K.516_-_1._Allegro.ogg" },
  { title : "String Quintet No. 4 in G minor, K. 516 - 2. Menuetto: Allegretto",         auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/6/6a/Wolfgang_Amadeus_mozart_-_String_Quintet_No._4_K.516_-_2._Menuetto_-_Allegretto.ogg" },
  { title : "String Quintet No. 4 in G minor, K. 516 - 3. Adagio ma non troppo",         auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:1, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/8/86/Wolfgang_Amadeus_mozart_-_String_Quintet_No._4_K.516_-_3._Adagio_ma_non_troppo.ogg" },
  { title : "String Quintet No. 4 in G minor, K. 516 - 3. Adagio",                       auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/6/68/Wolfgang_Amadeus_mozart_-_String_Quintet_No._4_K.516_-_4._Adagio_-_Allegro.ogg" },
  { title : "Symphony No. 38 in D major, K. 504 - 1. Adagio - Allegro",                  auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/7/73/Mozart_Symphony_38_D_major_Prague_KV_504_-_1_Adagio%E2%80%94Allegro.oga" },
  { title : "Symphony No. 38 in D major, K. 504 - 2. Andante in G minor",                auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/a/a9/Mozart_Symphony_38_D_major_Prague_KV_504_-_2_Andante_in_G_major.oga" },
  { title : "Symphony No. 38 in D major, K. 504 - 3. Finale (Presto)",                   auth : "Wolfgang Amadeus Mozart", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "https://upload.wikimedia.org/wikipedia/commons/7/7d/Mozart_Symphony_38_D_major_Prague_KV_504_-_3_Finale_%28Presto%29.oga" },
  { title : "aaa", auth : "aaa", lic : "(CC):BY-SA2", next:0, source:'www.wikipedia.org', url : "aaaa" }
]
//var playList = [];

function tmr() {
  now = new Date().getTime();
  t = Math.floor((now - strt)/1000); 
  timeScore = t;
  hGame = Math.floor(t/3600);
  t = t - hGame * 3600;
  mGame = Math.floor(t/60);
  sGame = t - mGame * 60;
  timerTxt = ((hGame >0)?hGame+'H':'')+((mGame>0)?mGame+'m':'')+sGame+'s';
  document.getElementById('timer').innerText = timerTxt;
}

function tadaa(game) {
  t = new Date();
  score = '{"date":"'+t.toLocaleDateString()+' '+t.toTimeString()+'","moves":"'+cnt+'","time":"'+timerTxt+'"}';
  c = getCookie('blbrcclcr');
  l = getCookie('niv');
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = alertContents;
  httpRequest.open('GET', 'score.php?g='+game+'&l='+l+'&c='+c+'&s='+score);
  httpRequest.send();
  document.getElementById('snd_success').play();
  save_score(game);
  //alert('F�licitation, vous avez gagn� !');
  shuffle();
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function alertContents() {
  if (httpRequest.readyState === XMLHttpRequest.DONE) {
    if (httpRequest.status === 200) { /* alert(httpRequest.responseText); */ } 
    else {   /* alert('There was a problem with the request.'); */ }
  }
}

function boooh(game) {
  document.getElementById('snd_game_over').play();
  if (game == 'Mahjong') alert('Plus de paire disponible :\'(');
  else alert('Perdu !');
}

function goto(game) {
  document.getElementById('snd_menu_click').play();
  window.location= './?g='+game+'&z='+getCookie('zoom');
}

function play_pause() {
  if (playPause) {
    document.getElementById('playpause').src = 'style/media/sound_off.png';
    createCookie('sound', 'off', 350);
    document.getElementById("tune").pause();
  }
  else {
    document.getElementById('playpause').src = 'style/media/sound_on.png';
    createCookie('sound', 'on', 350);
    document.getElementById("tune").play();
  }
  playPause = !playPause;
} 

function another_tune() {
  n_aired = Math.floor(Math.random()*playList.length-1);
  console.log('another_tune : n = '+n_aired);
  aired = playList[n_aired];
  document.getElementById('tune').src = aired.url;
  document.getElementById('tune_title').innerText = aired.title;
  document.getElementById('tune_auth').innerText = aired.auth;
  document.getElementById('tune_lic').innerText = aired.lic + ' - Source : ' + aired.source;
  if (playPause) document.getElementById('tune').play();
  else document.getElementById('tune').pause();
  
}

function next_tune() {
  console.log('next tune');
  if (aired.next == 1) {
    n_aired++;
    aired = playList[n_aired];
    document.getElementById('tune').src = aired.url;
    document.getElementById('tune_title').innerText = aired.title;
    document.getElementById('tune_auth').innerText = aired.auth;
    document.getElementById('tune_lic').innerText = aired.lic + ' - Source : ' + aired.source;
  }
  else another_tune();
}

function set_up() {
  volume = getCookie('volume');
  if (volume == '' || Number(volume) < 0 || Number(volume > 100)) volume = 50;
  console.log(volume);
  document.getElementById('tune').volume = volume/100;



  if (getCookie('sound') == 'off') {
    playPause  = false;
    document.getElementById('playpause').src = 'style/media/sound_off.png';
    document.getElementById("tune").pause();
  }
  var v = document.getElementById('tune');
  v.addEventListener("ended", function() { another_tune(); }); 
  another_tune();
    
  zoom = getCookie('zoom');
  if (zoom == '' || Number(zoom) < 0 || Number(zoom > 100)) zoom = 50;
  document.getElementById('zoom').value = zoom;
  set_zoom(zoom); 
  
  eventail();
}

function save_score(game) {
  p = getCookie('blbrcclcr');
  l = getCookie('niv');
  clearInterval(timer);
  var r = new XMLHttpRequest();
  r.open('GET', 'save_score.php?g='+game+'&l='+l+'&p='+p+'&s='+timeScore+'&c='+cnt);
  r.onreadystatechange = function(aEvt) {
    if (r.readyState == 4) {
      if (r.status == 200) {
        document.getElementById('scores').innerHTML = r.responseText;
        document.getElementById('scores').style.display = 'block';
      }
    } 
  };
  r.send();
}

function p_save_score() {
  var r = new XMLHttpRequest();
  r.open('POST', 'p_save_score.php', true);
  r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  if (document.getElementById('new_score_player').value != '') {
  r.send('p='+encodeURIComponent(document.getElementById('new_score_player').value)+
         '&g='+encodeURIComponent(document.getElementById('new_score_game').value)+
         '&l='+encodeURIComponent(document.getElementById('new_score_niv').value)+
         '&s='+encodeURIComponent(document.getElementById('new_score_time').value)+
         '&c='+encodeURIComponent(document.getElementById('new_score_moves').value));
  }
  document.getElementById('scores').style.display = 'none';
}

function list_scores(game, niv) {
  document.getElementById('choix_jeu').style.display = 'none';
  p = getCookie('blbrcclcr');
  clearInterval(timer);
  var r = new XMLHttpRequest();
  r.open('GET', 'list_scores.php?g='+game+'&l='+niv);
  r.onreadystatechange = function(aEvt) {
    if (r.readyState == 4) {
      if (r.status == 200) {
        document.getElementById('scores').innerHTML = r.responseText;
        document.getElementById('scores').style.display = 'block';
      }
    } 
  };
  r.send();
}

function choix_jeu() {
  document.getElementById('scores').style.display = 'none';
  document.getElementById('choix_jeu').style.display = 'block';
}