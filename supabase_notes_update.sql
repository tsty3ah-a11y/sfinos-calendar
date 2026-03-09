-- ══════════════════════════════════════════════════════════════
-- VetPlan — Client Notes & Details Update (March 2026)
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════

-- ΓΕΝΙΚΗ ΣΗΜΕΙΩΣΗ: Παραγγελίες στέλνω στα: dimitris.tsokanos@gmail.com, 2020gerakas@gmail.com, info@tsokanos.gr

-- ─── ΠΑΣΠΑΡΑΚΗ ΜΑΡΙΑ (Περιστέρι) ───
UPDATE clients SET
  notes = 'Ώρες: 9-14 & 17-20. Νύφη Μπίτζα. Πήγα 27/2 - παραγγελία 380€ καθαρά (προηγ. 485,51€): ινσουλίνη 100τμχ, γάντια latex 100τμχ, φλεβοκαθετήρες 22G, πράσινη πεταλούδα RAYS x3, polyflex 5cmx4,5cm x2. Καλός άνθρωπος, μεσαίο κτηνιατρείο.',
  address = 'ΚΑΖΑΝΤΖΑΚΗ 13'
WHERE name = 'ΠΑΣΠΑΡΑΚΗ ΜΑΡΙΑ' AND city = 'ΠΕΡΙΣΤΕΡΙ';

-- ─── ΝΙΖΑΜΗ ΕΥΑΓΓΕΛΙΑ (Περιστέρι) ───
UPDATE clients SET
  notes = 'Ώρες: 10-14 & 17-21. Email: enizam81@yahoo.gr. Μιλάει με Σπάνο. Πήγα 27/2. Μικρό κτηνιατρείο. Να ρωτήσω: γάντια Hartman (απλά+χειρουργικά), σπάμε Vanguard & Versican. Θέλει καταλόγους ΣΕ ΧΑΡΤΙ (όχι email).'
WHERE name = 'ΝΙΖΑΜΗ ΕΥΑΓΓΕΛΙΑ' AND city = 'ΠΕΡΙΣΤΕΡΙ';

-- ─── ΜΑΥΡΟΠΟΥΛΟΥ ΟΛΓΑ (Ίλιον) ───
-- There are two entries: ΜΑΥΡΟΠΟΥΛΟΥ and ΜΑΥΡΟΠΟΥΛΟΥ ΟΛΓΑ. Update the ΟΛΓΑ one.
UPDATE clients SET
  notes = 'Ώρες: 9-20. Email: olga4pet@gmail.com. Πήγα 27/2. Κόρη+μάνα=χειρουργεία, γιος=φάρμακα. Περιμένουν τιμή Antisedan. Καλοί πελάτες, μεσαίο κτηνιατρείο. Τηλ Δωροθέα: 6985034733, Γιώργος: 6980363232.',
  address = 'ΠΑΡΙΔΟΣ 60 & ΧΡΥΣΗΙΔΟΣ'
WHERE name = 'ΜΑΥΡΟΠΟΥΛΟΥ ΟΛΓΑ' AND city = 'ΙΛΙΟΝ';

-- Also update the duplicate ΜΑΥΡΟΠΟΥΛΟΥ entry
UPDATE clients SET
  notes = 'Βλ. ΜΑΥΡΟΠΟΥΛΟΥ ΟΛΓΑ (ίδιο κτηνιατρείο)',
  address = 'ΠΑΡΙΔΟΣ 60 & ΧΡΥΣΗΙΔΟΣ'
WHERE name = 'ΜΑΥΡΟΠΟΥΛΟΥ' AND city = 'ΙΛΙΟΝ' AND notes IS NULL;

-- ─── ΛΑΓΟΥΔΑΚΗ (Περιστέρι) ───
UPDATE clients SET
  notes = 'Ώρες: 10-20. Email: vetlagoudaki@gmail.com. Μικρό κτηνιατρείο. Εγκυμοσύνη, βρίσκει πατήματα ακόμα. Πήγα - δεν με είδε, με είδε ο βοηθός. Να ξαναπάρω τέλος εβδομάδας αφού στείλω mail.'
WHERE name LIKE 'ΛΑΓΟΥΔΑΚΗ%' AND city = 'ΠΕΡΙΣΤΕΡΙ';

-- ─── ΜΠΟΥΡΜΠΟΥ (Ίλιον) ───
UPDATE clients SET
  notes = 'Ώρες: 6:30-9. ΑΦΜ 046516777. Email: sosana.bourbou@gmail.com. Μικρό κτηνιατρείο, εύκολη - πετάς κατάλογο & παραγγέλνει. Παραγγελία 242,29€ (275,39€+ΦΠΑ): monolac 2/0 75cm, ketamidor 10ml, septona 60x90 90τμχ προσφορά, 4 seresto μεγάλα+δώρο.'
WHERE name = 'ΜΠΟΥΡΜΠΟΥ' AND city = 'ΙΛΙΟΝ';

-- ─── ΚΑΖΛΑΡΗ / ΚΑΛΖΑΡΗ (Ίλιον) ───
UPDATE clients SET
  notes = 'Email: ilion.vet@gmail.com. Ήθελε ράμματα - πήρε 1 κουτί chirlac 3/0 αντιστρόφως κοπτούσα ⅜ 90cm. Θα μιλήσουμε μέσα στη βδομάδα με τη βοηθό της.'
WHERE name LIKE 'ΚΑ%ΛΑΡΗ%' AND city = 'ΙΛΙΟΝ';

-- ─── ΝΤΕΒΕ ΜΑΡΙΑ (Περιστέρι) ───
UPDATE clients SET
  notes = 'Πήρε από Γιώργο.'
WHERE name = 'ΝΤΕΒΕ ΜΑΡΙΑ' AND city = 'ΠΕΡΙΣΤΕΡΙ';

-- ─── ΑΝΑΓΝΩΣΤΟΠΟΥΛΟΣ (Περιστέρι) ───
UPDATE clients SET
  notes = 'Ώρες: 11-20. Email: misgeor@gmail.com / babisvet@gmail.com. Το έχει η Ζέτα Βασιλείου (τηλ 6948636453, από ΠΘ κάναμε μαζί διατροφή). Παραγγελία: 4 seresto μεγάλα+δώρο, 4 advocate cat 1-4kg+gift.',
  phone = '2105779776',
  mobile = '6974999360'
WHERE name LIKE 'ΑΝΑΓΝΩΣΤΟΠΟΥΛΟΣ%' AND city = 'ΠΕΡΙΣΤΕΡΙ';

-- ─── ΜΗΤΣΗΣ ΒΑΣΙΛΗΣ (Ίλιον) ───
UPDATE clients SET
  notes = 'Ώρες: 9-13:30 & 17-20. Email: basilismitsis@gmail.com. 55 χρονών, βαριέται. Παίρνει ράμματα Medipack, ανένδοτος δεν αλλάζει. Advocate 44%+5% μετρητά, Advantix 37%+5% μετρητά. ΔΕΝ ΑΞΙΖΕΙ ΝΑ ΞΑΝΑΠΑΣ.',
  address = 'ΦΥΛΗΣ 145'
WHERE name = 'ΜΗΤΣΗΣ ΒΑΣΙΛΗΣ' AND city = 'ΙΛΙΟΝ';

-- ─── ΦΙΛΙΠΠΟΠΟΥΛΟΣ (Ίλιον) ───
UPDATE clients SET
  notes = 'Ώρες: 9-14 & 17:30-21:30. Email: agisfil@otenet.gr. Πολύ μεγάλος σε ηλικία (~70). Θέλει αντίγραφο κανονικό, ΔΕΝ ΒΛΕΠΕΙ EMAIL.'
WHERE name = 'ΦΙΛΙΠΠΟΠΟΥΛΟΣ' AND city = 'ΙΛΙΟΝ';

-- ─── ΠΑΝΟΣ ΧΑΡΑΛΑΜΠΟΣ (Ίλιον) ───
UPDATE clients SET
  notes = 'Ώρες: 9:30-13 & 17-20. Email: panoshar@hotmail.gr. Ήπιος άνθρωπος, δεν θέλει κάτι. Να τον ξαναπάρω τηλέφωνο να δει τα πράγματα.'
WHERE name = 'ΠΑΝΟΣ ΧΑΡΑΛΑΜΠΟΣ' AND city = 'ΙΛΙΟΝ';

-- ─── ΣΤΑΜΑΤΑΚΗ / ΘΗVET IKE (Περιστέρι - Θηβών 70) ───
-- Πρώην Σταυράκη, τώρα Γιώργος Σαραντόπουλος
UPDATE clients SET
  notes = 'ΝΕΟ: ΘΗVET IKE - Γιώργος Σαραντόπουλος (πρώην Σταυράκη). Συνεργασία με Σταϊκό. ΑΦΜ 802865957. Email: thivetgroup@gmail.com. Κιν: 6909059240. Πρέπει να πάρει ο Σπάνος - εγώ μόνο mail.',
  phone = '2112184565',
  mobile = '6909059240'
WHERE name LIKE 'ΣΤΑΜΑΤΑΚΗ%' AND city = 'ΠΕΡΙΣΤΕΡΙ';

-- ─── ΚΩΤΣΙΑΣ ΑΝΤΩΝΗΣ (Περιστέρι) ───
UPDATE clients SET
  notes = 'Αλβανός. Ώρες: 9:30-14 & 17-20:30. Πολύ μικρό κτηνιατρείο χωρίς δύναμη. Παίρνει πολύ φτηνά πράγματα που λήγουν. ΔΕΝ ΑΞΙΖΕΙ - μεγάλος σε ηλικία.'
WHERE name = 'ΚΩΤΣΙΑΣ ΑΝΤΩΝΗΣ' AND city = 'ΠΕΡΙΣΤΕΡΙ';

-- ─── ΓΕΩΡΓΟΥΛΗΣ ΚΩΝΣΤΑΝΤΙΝΟΣ (Καματερό) ───
UPDATE clients SET
  notes = '75 χρονών. Χρησιμοποιεί κασετίνες. Πολύ μικρό κτηνιατρείο. ΔΕΝ ΕΧΕΙ ΑΞΙΑ ΝΑ ΞΑΝΑΠΑΣ.'
WHERE name = 'ΓΕΩΡΓΟΥΛΗΣ ΚΩΝΣΤΑΝΤΙΝΟΣ' AND city = 'ΚΑΜΑΤΕΡΟ';

-- ─── ΦΛΑΚΑΣ ΑΝΑΣΤΑΣΙΟΣ (Πετρούπολη) ───
UPDATE clients SET
  notes = 'Ώρες: 9-13:30 & 17:30-20:30. Email: tflakas@otenet.gr. Αναστάσιος & Θοδωρής. Πολύ φιλικοί, ενδιαφέρονται για προσφορές. Γνωστοί Τσοκάνου. Θέλουν δείγμα ZM & Foliodrade. Δείγμα κολλάρο κρατς (ΟΧΙ κλικ).'
WHERE name = 'ΦΛΑΚΑΣ ΑΝΑΣΤΑΣΙΟΣ' AND city = 'ΠΕΤΡΟΥΠΟΛΗ';

-- ─── ΣΒΑΝΙΑΣ ΜΙΛΤΙΑΔΗΣ (Πετρούπολη) ───
UPDATE clients SET
  notes = 'Ώρες: 9-13 & 17-21. Email: info@pet-care.gr. Φίλος Μπίτζα & Σπάνου. Καλός άνθρωπος. Θέλει email + τηλ μου. ΝΑ ΤΟΝ ΠΑΡΩ ΤΗΛ ΑΡΧΗ ΕΒΔΟΜΑΔΑΣ.'
WHERE name = 'ΣΒΑΝΙΑΣ ΜΙΛΤΙΑΔΗΣ' AND city = 'ΠΕΤΡΟΥΠΟΛΗ';

-- ─── ΤΣΟΜΛΕΚΤΣΟΓΛΟΥ ΜΙΧΑΗΛ (Πετρούπολη) ───
UPDATE clients SET
  notes = 'Ώρες: 10-13:30 & 17-20. Email: mike_tsom@yahoo.gr. Καλός, εσωστρεφής. Είπε θα με πάρει όταν χρειαστεί. Μπίτζας: ρωτήσω αν δεν παίρνει λόγω αποθέματος ή αλλού. Στέλνω mail μόνο.',
  mobile = '6972806914'
WHERE name LIKE 'ΤΣΟΜΛΕΚΤΣΟΓΛΟΥ%' AND city = 'ΠΕΤΡΟΥΠΟΛΗ';

-- ─── ΑΥΔΗΣ ΣΤΑΥΡΟΣ (Πετρούπολη) ───
UPDATE clients SET
  notes = 'Ώρες: 9:30-13:30 & 17-20:30. Email: avdis.stavros@gmail.com. Συνεργάζεται Παληνη/Πειραιά/Χαϊδάρι. ΚΑΛΟΣ ΑΝΘΡΩΠΟΣ. 10-15 χειρουργεία/μήνα! Ενδιαφέρον εμβόλια+ράμματα. Θέλει δείγμα ράμματα. Πήρα παραγγελία 2 Canigen, περιμένω για φιπρονίλη.',
  mobile = '6938890658'
WHERE name = 'ΑΥΔΗΣ ΣΤΑΥΡΟΣ' AND city = 'ΠΕΤΡΟΥΠΟΛΗ';

-- ─── ΜΠΟΥΝΤΑΣ ΑΝΑΣΤΑΣΙΟΣ (Πετρούπολη) ───
UPDATE clients SET
  notes = 'Ώρες: 12-20. Email: vettasos@hotmail.com. Θέλει να παραγγείλει. ΣΤΕΙΛΩ MAIL & ΠΑΡΩ ΔΕΥΤΕΡΑ.'
WHERE name = 'ΜΠΟΥΝΤΑΣ ΑΝΑΣΤΑΣΙΟΣ' AND city = 'ΠΕΤΡΟΥΠΟΛΗ';

-- ─── ΓΚΑΝΤΑΪΦΗΣ ΔΗΜΗΤΡΙΟΣ (Λυκόβρυση) ───
UPDATE clients SET
  notes = 'Email: gandaifisvet@yahoo.gr. Μικρό κτηνιατρείο, όχι πολύ χρήμα. Θέλει τιμές: Flocidac, Clamoxyl, Vominil, Serenia, βελόνα 5/8. Ρωτήσω κολλάρο κρατς & τιμή Dorbene.'
WHERE name LIKE 'ΓΚΑΝΤΑΙΦΗΣ%' AND city = 'ΛΥΚΟΒΡΥΣΗ';

-- ─── ΧΑΣΤΑ-ΧΑΪΔΑΣ (Καματερό) ───
UPDATE clients SET
  notes = 'Ώρες: 10-14 & 18-20. Email: vetchasta@gmail.com. Πήγα 9/3 - ενδιαφέρονται! ΔΥΝΑΤΟ ΚΤΗΝΙΑΤΡΕΙΟ με καλές πιθανότητες να πάρουν πράγματα.',
  mobile = '6971627685'
WHERE name LIKE 'ΧΑΣΤΑ%' AND city = 'ΚΑΜΑΤΕΡΟ';

-- ─── ΣΕΡΓΙΟΥ ΔΗΜΗΤΡΑ (Αχαρνές) ───
UPDATE clients SET
  notes = 'Ώρες: 10-13:30 & 17:30-20. Ραντεβού 11/3 στις 10:15.'
WHERE name = 'ΣΕΡΓΙΟΥ ΔΗΜΗΤΡΑ' AND city LIKE 'ΑΧΑΡΝ%';

-- ─── ΚΕΦΑΛΑ (Αχαρνές) — Ευαγγελία Λαμπροπύλου & Ιωάννα Κεφάλα ───
UPDATE clients SET
  notes = 'Ευαγγελία Λαμπροπύλου & Ιωάννα Κεφάλα. Email: wevetmed@gmail.com. Κιν: 6978536803 / 6947368003.',
  mobile = '6978536803'
WHERE name = 'ΚΕΦΑΛΑ' AND city LIKE 'ΑΧΑΡΝ%';

-- ─── ΠΡΟΚΟΠΙΟΥ (Αχαρνές) ───
UPDATE clients SET
  notes = 'Μεγάλη κλινική. Πήγαμε - ειδική προσφορά. ΝΑ ΞΑΝΑΠΑΩ ΣΕ 1 ΒΔΟΜΑΔΑ να δω αν την είδαν.'
WHERE name = 'ΠΡΟΚΟΠΙΟΥ' AND city LIKE 'ΑΧΑΡΝ%';

-- ─── ΠΑΠΑΔΕΑ ΗΛΕΚΤΡΑ (Αχαρνές) — Λεωνή Παπαγγέλη ───
UPDATE clients SET
  notes = 'Λεωνή Παπαγγέλη (στην καρτέλα ως Παπαδέα). Email: lpvetcenter@gmail.com. Καλή κυρία, πελάτισσά μας. Ξέρει τα προϊόντα, θέλει να ψωνίσει. Λίγο πίεση ακόμα.'
WHERE name = 'ΠΑΠΑΔΕΑ ΗΛΕΚΤΡΑ' AND city LIKE 'ΑΧΑΡΝ%';

-- ─── ΠΑΠΠΟΥΣ ΠΑΝΑΓΙΩΤΗΣ (Αχαρνές) ───
UPDATE clients SET
  notes = 'ΑΦΜ 054239886. Email: takis31011966@gmail.com. Καλός κύριος. ΝΑ ΠΑΡΩ ΤΗΛ ΔΕΥΤΕΡΑ για παραγγελία. Ρώτησε αν έχουμε Polyvax & Neoleish.'
WHERE name = 'ΠΑΠΠΟΥΣ ΠΑΝΑΓΙΩΤΗΣ' AND city LIKE 'ΑΧΑΡΝ%';

-- ─── ΞΕΝΟΣ ΙΩΑΝΝΗΣ (Λυκόβρυση) ───
UPDATE clients SET
  notes = 'Ώρες: 9-13 & 17:30-20:30 ΕΚΤΟΣ ΤΕΤΑΡΤΗΣ. Email: xenvet@otenet.gr. Περίεργος, αντικοινωνικός. Τον ενδιαφέρει μόνο η τιμή. Ρώτησε ράμμα μήκους 1,5 μέτρου.'
WHERE name = 'ΞΕΝΟΣ ΙΩΑΝΝΗΣ' AND city = 'ΛΥΚΟΒΡΥΣΗ';

-- ─── ΚΟΜΒΟ ΒΕΤ / ΣΙΔΕΡΑΣ ΧΑΝΤΑΝΤ (Αγ. Ανάργυροι) ───
UPDATE clients SET
  notes = 'Ώρες: 10-14 & 17-21. Καλοί άνθρωποι. Τους έδωσα προσφορές - τις είχε δει ο Σπάνος.'
WHERE name LIKE '%ΧΑΝΤΑΝΤ%' AND city LIKE 'ΑΓ%ΑΝΑΡΓ%';

-- ─── ΛΑΨΑΝΗ (Αγ. Ανάργυροι) ───
UPDATE clients SET
  notes = 'Ώρες: 10-13 ΕΚΤΟΣ ΤΕΤΑΡΤΗΣ & 17-20. Email: vetlapsani@gmail.com. Καλή κυρία, αρκετό ενδιαφέρον. Θα την τουμπάρω εύκολα με προσοχή.',
  phone = '2102613461'
WHERE name = 'ΛΑΨΑΝΗ' AND city LIKE 'ΑΓ%ΑΝΑΡΓ%';

-- ═══════════════════════════════════════════════════════════════
-- ΝΕΟΣ ΠΕΛΑΤΗΣ: ΑΠΟΣΤΟΛΟΥ (Παιανία)
-- ═══════════════════════════════════════════════════════════════
-- First check if ΑΠΟΣΤΟΛΟΥ already exists to avoid duplicates
INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
SELECT id, 'ΑΠΟΣΤΟΛΟΥ', 'ΑΤΤΙΚΗΣ', 'ΑΓ. ΤΡΙΑΔΟΣ 73', 'ΠΑΙΑΝΙΑ', '2106646789', NULL,
  'Email: apostolouvet@gmail.com. Παραγγελία τηλ: ράμματα Chirasorb 2/0 90cm ⅜ 30mm, υποσέντονα Septona 60x90 90τμχ x2 (προσφορά), Vacusence plain 10ml 50τμχ x1, microchip VetID mini x1, microchip VetID standard x1, ορός 0,9% 1000ml x2 δεκάδες (προσφορά). ΣΟΣ: Στέλνω στην Κατερίνα Πάππα (Pappas Pet Center). Τιμολόγια στην τράπεζα.'
FROM routes WHERE name = 'ΑΘΗΝΑ 1'
AND NOT EXISTS (SELECT 1 FROM clients WHERE name = 'ΑΠΟΣΤΟΛΟΥ' AND city = 'ΠΑΙΑΝΙΑ');

-- ═══════════════════════════════════════════════════════════════
-- Done! Verify with:
-- SELECT name, city, notes FROM clients WHERE route_id = (SELECT id FROM routes WHERE name LIKE 'Αθήνα 1%') AND notes IS NOT NULL ORDER BY city, name;
-- ═══════════════════════════════════════════════════════════════
