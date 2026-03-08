-- ============================================
-- VET VISIT PLANNER — SEED DATA
-- All data imported from '2026 CALENDAR FULL.xlsx'
-- ============================================

-- Ensure routes exist (idempotent)
INSERT INTO routes (name, display_order, color) VALUES
  ('ΑΘΗΝΑ 1', 1, '#4A90D9'),
  ('ΑΘΗΝΑ 2', 2, '#E67E22'),
  ('ΑΘΗΝΑ 3', 3, '#27AE60'),
  ('ΑΘΗΝΑ 4', 4, '#8E44AD'),
  ('ΕΥΒΟΙΑ',  5, '#E74C3C')
ON CONFLICT (name) DO NOTHING;

-- ── CYCLES (8 cycles, March–December 2026) ──
INSERT INTO cycles (cycle_number, year, start_date, end_date) VALUES
  (1, 2026, '2026-03-01', '2026-04-04'),
  (2, 2026, '2026-04-05', '2026-05-09'),
  (3, 2026, '2026-05-10', '2026-06-13'),
  (4, 2026, '2026-06-14', '2026-07-18'),
  (5, 2026, '2026-07-19', '2026-09-19'),
  (6, 2026, '2026-09-20', '2026-10-24'),
  (7, 2026, '2026-10-25', '2026-11-28'),
  (8, 2026, '2026-11-29', '2026-12-31')
ON CONFLICT (cycle_number, year) DO UPDATE SET start_date = EXCLUDED.start_date, end_date = EXCLUDED.end_date;

-- ── CLIENTS (202 total) ──
-- Using a DO block to resolve route IDs
DO $$
DECLARE
  r_athina1 UUID;
  r_athina2 UUID;
  r_athina3 UUID;
  r_athina4 UUID;
  r_evia UUID;
BEGIN
  SELECT id INTO r_athina1 FROM routes WHERE name = 'ΑΘΗΝΑ 1';
  SELECT id INTO r_athina2 FROM routes WHERE name = 'ΑΘΗΝΑ 2';
  SELECT id INTO r_athina3 FROM routes WHERE name = 'ΑΘΗΝΑ 3';
  SELECT id INTO r_athina4 FROM routes WHERE name = 'ΑΘΗΝΑ 4';
  SELECT id INTO r_evia    FROM routes WHERE name = 'ΕΥΒΟΙΑ';

  -- ΑΘΗΝΑ 1
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΛΑΨΑΝΗ', 'ΑΤΤΙΚΗΣ', 'ΚΕΦΑΛΛΗΝΙΑΣ 104', 'ΑΓ. ΑΝΑΡΓΥΡΟΙ', '210 2613461', '6932 985886', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΠΡΟΚΟΠΙΟΥ', 'ΑΤΤΙΚΗΣ', 'Λ. ΘΡΑΚΟΜΑΚΕΔΟΝΩΝ 210', 'ΑΧΑΡΝΑΙ', '2102431536', '6973036682', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΡΑΠΤΗΣ', 'ΑΤΤΙΚΗΣ', 'Λ. ΚΑΡΑΜΑΝΛΗ 106', 'ΑΧΑΡΝΑΙ', '2102440936', '6976518098', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΚΕΦΑΛΑ', 'ΑΤΤΙΚΗ', 'ΠΆΡΝΗΘΟΣ 137', 'ΑΧΑΡΝΑΙ', '2110019909', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΣΕΡΓΙΟΥ ΔΗΜΗΤΡΑ', 'ΑΤΤΙΚΗΣ', 'ΘΡΑΚΟΜΑΚΕΔΌΝΩΝ 129', 'ΑΧΑΡΝΑΙ', '2102430206', NULL, 'ΣΕΡΓΙΟΥ ΑΧΑΡΝΑΙ ΤΕΤΑΡΤΗ 11/3 10.15');
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΚΑΖΛΑΡΗ', 'ΑΤΤΙΚΗΣ', 'ΜΑΞΙΜΙΛΙΑΝΟΥ 22', 'ΙΛΙΟΝ', '2130259161', '6989681230', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΜΑΥΡΟΠΟΥΛΟΥ', 'ΑΤΤΙΚΗΣ', 'ΕΚΤΩΡΟΣ 85', 'ΙΛΙΟΝ', '210 2637382', '6944 296711', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΜΗΤΣΗΣ ΒΑΣΙΛΗΣ', 'ΑΤΤΙΚΗΣ', 'ΛΕΩΦ. ΧΑΣΙΑΣ 145', 'ΙΛΙΟΝ', '2102616221', '6974243669', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΜΠΟΥΡΜΠΟΥ', 'ΑΤΤΙΚΗΣ', 'ΑΧΙΛΕΩΣ 34', 'ΙΛΙΟΝ', '210 2690078', '6944 372235', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΠΑΝΟΣ ΧΑΡΑΛΑΜΠΟΣ', 'ΑΤΤΙΚΗΣ', 'ΙΔΟΜΕΝΕΩΣ 119', 'ΙΛΙΟΝ', '210 2621758', '6937 394312', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΦΙΛΙΠΠΟΠΟΥΛΟΣ', 'ΑΤΤΙΚΗΣ', 'ΑΓ. ΑΙΚΑΤΕΡΙΝΗΣ 4', 'ΙΛΙΟΝ', '210 2691686', '6944 367899', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΑΝΑΓΝΩΣΤΟΠΟΥΛΟΣ ΧΑΡΑΛΑΜΠΟΣ', 'ΑΤΤΙΚΗΣ', 'ΠΕΛΑΣΓΙΑΣ 73 &ΠΡΑΞΙΤΕΛΟΥΣ 1', 'ΠΕΡΙΣΤΕΡΙ', '2105770776', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΓΙΑΝΝΟΠΟΥΛΟΣ ΔΗΜΗΤΡΗΣ', 'ΑΤΤΙΚΗΣ', 'ΣΟΛΩΜΟΥ ΔΙΟΝΥΣΙΟΥ 31', 'ΠΕΡΙΣΤΕΡΙ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΚΩΤΣΙΑΣ ΑΝΤΩΝΗΣ', 'ΑΤΤΙΚΗΣ', 'ΚΟΤΥΛΙΟΥ 13', 'ΠΕΡΙΣΤΕΡΙ', '210 5721310', '6974 472073', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΜΑΚΡΟΓΚΙΚΑΣ ΣΥΜΕΩΝ', 'ΑΤΤΙΚΗΣ', 'ΠΑΝΑΓΗ ΤΣΑΛΔΑΡΗ 8', 'ΠΕΡΙΣΤΕΡΙ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΠΑΣΠΑΡΑΚΗ', 'ΑΤΤΙΚΗΣ', NULL, 'ΠΕΡΙΣΤΕΡΙ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΚΩΣΤΙΔΗΣ', 'ΑΤΤΙΚΗΣ', 'ΠΕΛΑΣΓΙΑΣ 25Α &ΝΑΥΠΑΚΤΟΥ 1', 'ΠΕΡΙΣΤΕΡΙ - Ν.ΖΩΗ', '210 5730012', '6947708586', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΑΥΔΗΣ ΣΤΑΥΡΟΣ', 'ΑΤΤΙΚΗΣ', 'ΑΓ. ΓΛΥΚΕΡΙΑΣ 42', 'ΠΕΤΡΟΥΠΟΛΗ', '210 5059170', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΤΣΟΜΛΕΚΤΣΟΓΛΟΥ Ι. ΜΙΧΑΗΛ', 'ΑΤΤΙΚΗΣ', 'ΔΙΓΕΝΗ ΑΚΡΙΤΑ 98', 'ΠΕΤΡΟΥΠΟΛΗ', '2105011757', '6972 806914', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΣΙΔΕΡΑΣ Δ. ΧΑΝΤΑΝΤ & Η ΣΙΔΕΡΑΣ ΧΑΝΤΑΝΤ ΟΕ (ΚΟΜΒΟ VET)', 'ΑΤΤΙΚΗΣ', 'ΑΘ. ΔΙΑΚΟΥ 4Α', 'ΑΓ. ΑΝΑΡΓΥΡΟΙ', '210 2633238', '6937455581', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΚΑΛΑΝΟΨΗΣ ΜΑΝΩΛΗΣ', 'ΑΤΤΙΚΗΣ', 'ΑΡΧΑΙΟΥ ΘΕΑΤΡΟΥ 68', 'ΑΧΑΡΝΑΙ', '2102400519/2102468292', '6972400519', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΠΑΠΑΔΕΑ ΗΛΕΚΤΡΑ', 'ΑΤΤΙΚΗΣ', 'ΦΙΛΑΔΕΛΦΕΙΑΣ 125', 'ΑΧΑΡΝΑΙ', '2102404884', '6948533721', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΠΑΠΠΟΥΣ ΠΑΝΑΓΙΩΤΗΣ', 'ΑΤΤΙΚΗΣ', 'ΠΑΡΝΗΘΟΣ 116', 'ΑΧΑΡΝΑΙ', '2102447508', '6934395897', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΜΑΥΡΟΠΟΥΛΟΥ ΟΛΓΑ', 'ΑΤΤΙΚΗΣ', 'ΕΚΤΩΡΟΣ 85', 'ΙΛΙΟΝ', '210 2637382', '6944 296711', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΛΑΓΟΥΔΑΚΗ ΧΡΥΣΑ', 'ΑΤΤΙΚΗΣ', 'ΠΛΑΤΩΝΟΣ 15 & ΑΝΔΡΙΑΝΟΥΠΟΛΕΩΣ 38', 'ΠΕΡΙΣΤΕΡΙ', '2109530856', '6981126619', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΜΗΝΑΔΑΚΗ ΕΙΡΗΝΗ', 'ΑΤΤΙΚΗΣ', 'ΣΩΚΡΑΤΟΥΣ 5', 'ΠΕΡΙΣΤΕΡΙ', '2105762636', '6976846575', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΜΗΝΑΔΑΚΗΣ ΜΗΝΑΣ', 'ΑΤΤΙΚΗΣ', 'ΣΩΚΡΑΤΟΥΣ 5', 'ΠΕΡΙΣΤΕΡΙ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΝΙΖΑΜΗ ΕΥΑΓΓΕΛΙΑ', 'ΑΤΤΙΚΗΣ', 'Λ. ΑΘΗΝΩΝ 362', 'ΠΕΡΙΣΤΕΡΙ', '2105733061', '6942019166', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΝΤΕΒΕ ΜΑΡΙΑ', 'ΑΤΤΙΚΗΣ', 'ΑΓ. ΒΑΣΙΛΕΙΟΥ 151', 'ΠΕΡΙΣΤΕΡΙ', '210 5712011', '6999 200031 / 6947370484', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΠΑΣΠΑΡΑΚΗ ΜΑΡΙΑ', 'ΑΤΤΙΚΗΣ', 'ΚΑΖΑΝΤΖΑΚΗ 13', 'ΠΕΡΙΣΤΕΡΙ', '2105773539', '6932 449824 / 6932524718', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΣΤΑΜΑΤΑΚΗ ΕΥΣΤΑΘΙΑ', 'ΑΤΤΙΚΗΣ', 'ΘΗΒΩΝ 70', 'ΠΕΡΙΣΤΕΡΙ', '2105746111', '6932909817', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΜΠΟΥΝΤΑΣ ΑΝΑΣΤΑΣΙΟΣ', 'ΑΤΤΙΚΗΣ', 'ΑΝΑΤΟΛΙΚΗ ΡΩΜΥΛΙΑΣ 84', 'ΠΕΤΡΟΥΠΟΛΗ', '210 5055037', '6932 367389', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΣΒΑΝΙΑΣ ΜΙΛΤΙΑΔΗΣ', 'ΑΤΤΙΚΗΣ', 'ΠΕΡΙΚΛΕΟΥΣ 107', 'ΠΕΤΡΟΥΠΟΛΗ', '210 5061131', '6977 653896', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΦΛΑΚΑΣ ΑΝΑΣΤΑΣΙΟΣ', 'ΑΤΤΙΚΗΣ', 'ΣΠΑΡΤΗΣ 25', 'ΠΕΤΡΟΥΠΟΛΗ', '210 5059395', '6944 540405', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΧΑΣΤΑ ΑΙΚΑΤΕΡΙΝΗ-ΧΑΪΔΑΣ ΑΝΑΣΤΑΣΙΟΣ', 'ΑΤΤΙΚΗΣ', 'ΜΑΡΑΘΩΝΟΣ 5', 'ΚΑΜΑΤΕΡΟ', '2102311983', '6946905665', 'ΧΑΝΤΑ ΚΑΜΑΤΕΡΟ ΔΕΥΤΕΡΑ 9/3 2.30 ΜΕΣΗΜΕΡΙ');
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΓΕΩΡΓΟΥΛΗΣ ΚΩΝΣΤΑΝΤΙΝΟΣ', 'ΑΤΤΙΚΗΣ', 'Λ. ΦΥΛΗΣ 151', 'ΚΑΜΑΤΕΡΟ', '2102310956', '6976405220', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΓΚΑΝΤΑΙΦΗΣ ΔΗΜΗΤΡΙΟΣ', 'ΑΤΤΙΚΗΣ', 'ΟΥΛΟΦ ΠΑΛΜΕ 5', 'ΛΥΚΟΒΡΥΣΗ', '2102822595', '6932124881', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΞΕΝΟΣ ΙΩΑΝΝΗΣ', 'ΑΤΤΙΚΗΣ', 'ΑΓ. ΒΑΡΒΑΡΑΣ 15', 'ΛΥΚΟΒΡΥΣΗ', '210 2848067', '6932 165881', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΚΙΝΝΑ', 'ΑΤΤΙΚΗΣ', 'ΡΟΔΟΥ', 'ΜΕΤΑΜΟΡΦΩΣΗ', '210 2840411', '6937 478080', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina1, 'ΔΗΜΗΤΡΕΛΟΥ ΑΣΗΜΙΝΑ', 'ΑΤΤΙΚΗΣ', 'ΗΡΑΚΛΕΟΥΣ 35', 'ΜΕΤΑΜΟΡΦΩΣΗ', '210 2816073', '6976 606226', NULL);
  -- ΑΘΗΝΑ 2
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΜΟΛΥΜΠΑΚΗ ΕΥΓΕΝΙΑ', 'ΑΤΤΙΚΗΣ', 'Μ. ΑΛΕΞΑΝΔΡΟΥ 177', 'ΑΓΙΑ ΒΑΡΒΑΡΑ', '210 5620417', '6970963453', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΓΟΥΒΑΛΗ ΑΝΤΩΝΙΑ', 'ΑΤΤΙΚΗΣ', NULL, 'ΑΙΓΑΛΕΩ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΧΑΡΙΤΟΠΟΥΛΟΣ', 'ΑΤΤΙΚΗΣ', 'Λ. ΘΗΒΩΝ 414', 'ΑΙΓΑΛΕΩ', '210 5441052', '6973339695', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΤΕΡΖΌΠΟΥΛΟΣ', NULL, 'ΙΕΡΑ ΟΔΟΣ 200', 'ΑΙΓΑΛΕΩ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΓΟΥΒΑΛΗ ΑΝΤΩΝΙΑ', 'ΑΤΤΙΚΗΣ', 'ΣΜΥΡΝΗΣ 18', 'ΑΙΓΑΛΕΩ', '210 5989219', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΚΑΤΣΙΚΙΩΤΗΣ Γ. & ΣΙΑ Ε.Ε.', 'ΑΤΤΙΚΗΣ', 'ΞΑΝΘΟΥ 7', 'ΑΙΓΑΛΕΩ', '210-5312380', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΚΟΡΟΠΟΥΛΗ', 'ΠΕΙΡΑΙΆΣ', 'ΔΗΜΗΤΡΑΚΟΠΟΥΛΟΥ 65', 'ΚΟΡΥΔΑΛΛΟΣ', NULL, '6977646656', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΚΟΡΟΠΟΥΛΗ ΜΑΡΙΑ', 'ΑΤΤΙΚΗΣ', 'ΔΗΜΗΤΡΑΚΟΠΟΥΛΟΥ 65 & ΓΡ. ΛΑΜΠΡΑΚΗ', 'ΚΟΡΥΔΑΛΛΟΣ', '210 4940800', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΜΑΚΡΗΣ ΠΑΝΤΕΛΗΣ', 'ΠΕΙΡΑΙΑ', 'ΑΓ. ΓΕΩΡΓΙΟΥ 11', 'ΚΟΡΥΔΑΛΛΟΣ', '210 4971737', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΝΤΑΚΟΥΛΑ ΙΩΑΝΝΟΥ ΒΑΙΑ', 'ΠΕΙΡΑΙΑ', 'ΣΚΟΥΦΑ 6 & Δ. ΔΙΑΜΑΝΤΙΔΗ', 'ΚΟΡΥΔΑΛΛΟΣ', '2104967762 / 2104977075', '6972 010689 / 6944240433', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΠΑΝΤΕΛΗ ΜΑΡΙΝΑ', 'ΑΤΤΙΚΗΣ', 'ΑΓΙΟΥ ΝΙΚΟΛΑΟΥ 72', 'ΚΟΡΥΔΑΛΛΟΣ', '210-5693588', '6932800588', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΣΤΑΥΡΟΠΟΥΛΟΣ ΣΤΑΥΡΟΣ', 'ΠΕΙΡΑΙΑ', 'Γ. ΛΑΜΠΡΑΚΗ 257', 'ΚΟΡΥΔΑΛΛΟΣ', '210 4960125', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΚΑΛΑΦΑΤΗ', 'ΠΕΙΡΑΙΑΣ', 'ΜΑΒΙΛΗ 12', 'ΚΟΡΥΔΑΛΛΌΣ', '2111178346', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΙΑΤΡΟΥ ΞΑΝΘΗ', 'ΑΤΤΙΚΗΣ', '7ης ΜΑΡΤΗ 1944  87', 'ΝΙΚΑΙΑ', '210 4922117', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'PET VET ΡΑΧΙΩΤΗ', 'ΠΕΙΡΑΙΑ', 'ΠΕΤΡΟΥ ΡΑΛΛΗ 323', 'ΝΙΚΑΙΑ', '210 4907142', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΖΩΡΖΟΣ ΜΙΧΑΛΗΣ', 'ΑΤΤΙΚΗΣ', 'ΧΡΥΣΟΣΤΟΜΟΥ ΣΜΥΡΝΗΣ 39', 'ΝΙΚΑΙΑ', '210 4951147', '6977802694', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΜΠΑΛΤΖΑΝ ΣΤΕΛΛΑ', 'ΑΤΤΙΚΗΣ', 'ΠΛΑΤΕΙΑ ΔΑΒΑΚΗ 17', 'ΝΙΚΑΙΑ', '210 4253161', '6974243817', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΓΡΟΥΣΠΑΣ ΗΛΙΑΣ', 'ΠΕΙΡΑΙΑ', 'N. ΜΠΕΛΟΓΙΑΝΝΗ 114Γ', 'ΝΙΚΑΙΑ', '2104916374', '6944307702', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΓΙΑΝΝΟΠΟΥΛΟΣ ΗΛΙΑΣ', 'ΑΤΤΙΚΗΣ', 'ΚΡΗΤΗΣ 8 & ΗΠΕΙΡΟΥ', 'ΒΡΙΛΗΣΣΙΑ', '210 6008185', '6972 160159', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΚΩΤΣΗ ΔΕΣΠΟΙΝΑ', 'ΑΤΤΙΚΗΣ', 'ΕΘΝΙΚΗΣ ΑΝΤΙΣΤΑΣΕΩΣ 37', 'ΒΡΙΛΗΣΣΙΑ', '2108105880', '6936891918', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΚΟΙΝΗΣ ΑΛΕΞΑΝΔΡΟΣ', 'ΑΤΤΙΚΗΣ', 'ΑΙΑΝΤΟΣ 4', 'ΒΡΙΛΗΣΣΙΑ', '210 8041569', '6944728023', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΚΥΡΚΟΥ- ΧΑΤΖΗΕΥΣΤΑΘΙΟΥ ΜΑΓΔΑΛΗΝΗ', 'ΑΤΤΙΚΗΣ', '17 ΝΟΕΜΒΡΙΟΥ 25', 'ΜΕΛΙΣΣΙΑ', '210-6130300', '6944 502092', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΛΟΥΜΙΤΗΣ ΦΩΤΗΣ', 'ΑΤΤΙΚΗΣ', 'ΕΛ. ΒΕΝΙΖΕΛΟΥ27', 'ΜΕΛΙΣΣΙΑ', '2108102727', '6972038820', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΓΕΩΡΓΙΑ ΞΥΠΟΛΙΑ', NULL, 'Λ.Δημοκρατιας 34', 'ΜΕΛΙΣΣΙΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'pet aid ΑΛΕΞ ΚΑΡΤΖΟΝΙΚΑ', NULL, 'Κυκλάδων 1', 'ΜΕΛΙΣΣΙΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, '+ cat vet', NULL, 'Λ.Πηγής 23', 'ΜΕΛΙΣΣΙΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΚΛΗΜΗΣ ΜΙΧΑΗΛ', 'ΑΤΤΙΚΗΣ', 'ΕΛΙΖΑΣ ΜΠΑΡΜΠΟΥΑ 3Α', 'Π. ΠΕΝΤΕΛΗ', '210 8041569', '6944 343691', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΑΝΤΩΝΙΑΔΟΥ', 'ΑΤΤΙΚΗ', 'ΙΕΡΑ ΟΔΟΣ', 'ΧΑΙΔΑΡΙ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΒΛΑΣΤΟΣ ΒΑΣΊΛΗΣ', 'ΑΤΤΙΚΗ', 'ΠΑΠΑΝΔΡΈΟΥ', 'ΧΑΙΔΑΡΙ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'PET VET CARE ΜΠΟΥΡΝΟΥΣ ΠΕΤΡΟΣ', 'ΑΤΤΙΚΗΣ', 'ΜΑΡΝΗΣ 51', 'ΧΑΙΔΑΡΙ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΜΠΕΘΑΝΗΣ ΚΩΝΣΤΑΝΤΙΝΟΣ', 'ΑΤΤΙΚΗΣ', 'ΣΤΡΑΤΑΡΧΗ ΚΑΡΑΙΣΚΑΚΗ 103', 'ΧΑΙΔΑΡΙ', '6957 157551', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΠΑΝΑΓΙΩΤΟΠΟΥΛΟΣ ΑΝΑΣΤΑΣΙΟΣ', 'ΑΤΤΙΚΗΣ', 'ΑΓΩΝ. ΣΤΡΑΤΟΠ. ΧΑΙΔΑΡΙΟΥ 40', 'ΧΑΙΔΑΡΙ', '2105324112', '6932847417', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΡΑΚΚΑΣ ΣΟΛΩΝ', 'ΑΤΤΙΚΗΣ', 'ΟΔΥΣΣΕΑ ΕΛΥΤΗ 4', 'Ν. ΠΕΝΤΕΛΗ', '210 6133269', '6932 401310', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΤΕΤΑ ΑΣΗΜΑΚΟΠΟΥΛΟΥ', NULL, 'αθ.διακου 10', 'ΠΕΥΚΗ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΑΝΤΩΝΟΠΟΥΛΟΣ ΘΕΟΔΩΡΟΣ', 'ΑΤΤΙΚΗΣ', 'ΧΡΥΣΟΣΤΟΜΟΥ ΣΜΥΡΝΗΣ 53', 'ΠΕΥΚΗ', '210 2525590', '6993 252672', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΓΕΩΡΓΑΚΟΠΟΥΛΟΣ ΓΕΩΡΓΙΟΣ', 'ΑΤΤΙΚΗΣ', 'ΠΙΝΔΟΥ 6', 'ΠΕΥΚΗ', '210 8061008', '6951 000262', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΚΤΕΝΑΣ ΧΡΗΣΤΟΣ', 'ΑΤΤΙΚΗΣ', 'ΡΗΓΑ ΦΕΡΡΑΙΟΥ 11', 'ΝΕΑ ΕΡΥΘΡΑΙΑ', '210 6202150', '6944 390555', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΣΤΕΦΑΝΙΔΗΣ ΣΠΥΡΙΔΩΝ', 'ΑΤΤΙΚΗΣ', 'ΠΡΩΤΟΜΑΓΙΑΣ 7', 'ΝΕΑ ΕΡΥΘΡΑΙΑ', '210 8073731', '6932 403282', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΑΛΙΑΔΗ ΒΙΚΤΩΡΙΑ', 'ΑΤΤΙΚΗΣ', 'ΕΛ. ΒΕΝΙΖΕΛΟΥ 173', 'ΝΕΑ ΕΡΥΘΡΑΙΑ', '210 8073681', '6932520212', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΑΝΑΓΝΩΣΤΟΠΟΥΛΟΣ ΘΑΛΗ ΓΕΩΡΓΙΟΣ', 'ΑΤΤΙΚΗΣ', 'Κ. ΒΑΡΝΑΛΗ 70', 'ΝΕΑ ΕΡΥΘΡΑΙΑ', '210 8078204', '6944 565790', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina2, 'ΓΑΛΑΝΑΚΗΣ ΚΩΣΤΗΣ', 'ΑΤΤΙΚΗΣ', 'ΤΑΤΟΙΟΥ 98', 'ΝΕΑ ΕΡΥΘΡΑΙΑ', '2108081639', '6998663359', NULL);
  -- ΑΘΗΝΑ 3
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΣΑΛΠΕΑ ΕΛΙΣΑΒΕΤ', 'ΠΕΙΡΑΙΑ', 'ΣΤΡΑΤΗΓΟΥ ΜΑΚΡΥΓΙΑΝΝΗ ΙΩΑΝΝΗ 19', 'ΑΓ. ΙΩΑΝΝΗΣ ΡΕΝΤΗΣ', '2104321063', '6936746526', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΜΥΚΟΝΙΑΤΗΣ ΚΩΝ/ΝΟΣ', 'ΠΕΙΡΑΙΑ', 'ΚΡΙΕΖΩΤΟΥ 23', 'ΑΓ. ΣΟΦΙΑ ΠΕΙΡΑΙΑΣ', '210 4208020', '6944 786610', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΣΚΑΡΑΦΙΓΚΑ ΠΑΝΑΓΙΩΤΑ', 'ΑΤΤΙΚΗΣ', 'ΠΛΑΤΕΙΑ ΑΓ. ΝΕΚΤΑΡΙΟΥ', 'ΚΗΦΙΣΙΑ', '210 8085090', '6973 018749', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΚΑΝΕΛΛΟΠΟΥΛΟΥ ΕΙΡΗΝΗ', 'ΑΤΤΙΚΗΣ', 'ΠΙΝΔΟΥ 16', 'ΚΗΦΙΣΙΑ', '210 8013302', '6987 153151', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΜΙΧΑΗΛ ΡΑΝΙΑ', 'ΑΤΤΙΚΗΣ', 'ΕΜΜΑΝΟΥΗΛ ΜΠΕΝΑΚΗ 6', 'ΚΗΦΙΣΙΑ', '210 8088877', '6977 976397', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΧΑΤΖΗΠΕΤΡΟΥ ΕΛΕΥΘΕΡΙΟΣ', 'ΠΕΙΡΑΙΑ', 'ΚΑΝΙΓΓΟΣ 6', 'ΠΑΣΑΛΙΜΑΝΙ', '210 4114365', '6932735270', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΤΣΑΤΣΑΣ', 'ΑΤΤΙΚΗΣ', 'ΩΡΩΠΟΥ 5', 'ΛΑΜΠΡΙΝΗ', '2102131883', '6932371867', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΚΑΛΤΣΑ ΧΡΥΣΟΥΛΑ', 'ΑΤΤΙΚΗΣ', 'ΑΝΔΡΙΤΣΑΙΝΗΣ 37', 'ΛΑΜΠΡΙΝΗ', '2108016345', '6931701612', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΚΟΝΤΑΞΗ ΜΑΡΙΑ και ΒΑΣΙΛΗΣ ΤΣΟΥΚΑΛΑΣ', 'ΑΤΤΙΚΗΣ', 'ΕΛΑΙΩΝ 25', 'Ν.ΚΗΦΙΣΙΑ', '210 6252996', '6944 668811', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΦΛΑΡΑΚΟΣ ΜΙΧΑΗΛ', 'ΑΤΤΙΚΗΣ', 'ΚΗΦΙΣΟΥ 65 ΚΑΙ ΑΗΔΟΝΟΣ', 'ΝΕΑ ΚΗΦΙΣΙΑ', '2106251103', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΚΟΥΣΙΔΗΣ ΝΙΚΟΛΑΟΣ', 'ΑΤΤΙΚΗΣ', 'ΥΠΑΠΑΝΤΗΣ 97', 'ΔΡΑΠΕΤΣΩΝΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΚΑΛΟΓΕΡΟΠΟΥΛΟΥ ΑΝΑΣΤΑΣΙΑ', NULL, 'ΚΟΙΜΗΣΕΩΣ ΘΕΟΤΟΚΟΥ 38', 'ΑΓΙΟΣ ΣΤΕΦΑΝΟΣ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΜΑΡΚΑΝΤΩΝΑΤΟΥ ΑΝΑΣΤΑΣΙΑ', 'ΑΤΤΙΚΗΣ', 'ΧΕΛΜΟΥ 23', 'ΑΓΙΟΣ ΣΤΕΦΑΝΟΣ', '210 8140961', '6973 258479', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΓΚΟΥΒΕΛΗΣ ΘΥΜΙΟΣ', 'ΑΤΤΙΚΗΣ', 'ΑΓ. ΕΛΕΥΘΕΡΙΟΥ 32', 'ΚΑΜΙΝΙΑ', '210 4819511', '6977659803', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΠΑΠΑΔΑΚΗΣ ΔΗΜΗΤΡΗΣ', 'ΠΕΙΡΑΙΑ', 'ΚΥΘΝΟΥ 42', 'ΚΑΜΙΝΙΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΜΕΛΑΣ ΕΠΑΜΕΙΝΩΝΔΑΣ', 'ΠΕΙΡΑΙΑ', 'ΖΑΙΜΗ &ΣΜΟΛΕΝΣΚΥ 2', 'Ν. ΦΑΛΗΡΟ', '2104818688', '6977325519', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΑΡΓΥΡΑΚΗΣ ΚΩΝΣΤΑΝΤΙΝΟΣ', 'ΑΤΤΙΚΗΣ', 'Λ. ΠΟΣΕΙΔΩΝΟΣ 17 &ΚΡΟΝΟΥ 2', 'Π. ΦΑΛΗΡΟ', '210 9833283', '6932400250', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΒΑΡΕΣΗΣ ΟΔΥΣΣΕΑΣ', 'ΑΤΤΙΚΗΣ', 'ΚΡΗΤΗΣ 34', 'Π. ΦΑΛΗΡΟ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΠΑΠΑΔΗΜΗΤΡΙΟΥ ΘΩΜΑΣ', 'ΑΤΤΙΚΗΣ', 'ΖΗΣΙΜΟΠΟΥΛΟΥ 59', 'Π. ΦΑΛΗΡΟ', '211 2157736', '6946253445', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΣΑΚΕΛΛΑΡΙΟΥ ΒΑΣΙΛΗΣ', 'ΑΤΤΙΚΗΣ', 'ΚΟΛΟΚΟΤΡΩΝΗ 2-4', 'Π. ΦΑΛΗΡΟ', '2109840485', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΣΑΠΟΥΤΖΟΓΛΟΥ', 'ΑΤΤΙΚΗΣ', 'ΠΡΩΤΕΩΣ 80', 'Π. ΦΑΛΗΡΟ', '2109848481', '6945494021', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΧΑΡΛΑΥΤΗΣ', 'ΑΤΤΙΚΗΣ', 'ΑΓ. ΤΡΙΑΔΟΣ 33', 'Π. ΦΑΛΗΡΟ', '210 9825095', '6970 834182', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΧΡΥΣΟΒΕΡΙΔΗΣ', 'ΑΤΤΙΚΗΣ', 'ΑΓ. ΑΛΕΞΑΝΔΡΟΥ 74', 'Π. ΦΑΛΗΡΟ', '2109889242', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΔΡΑΚΟΥΛΗ ΙΣΜΗΝΗ', 'ΑΤΤΙΚΗΣ', 'Λ. ΠΟΣΕΙΔΩΝΟΣ & ΕΣΠΕΡΟΥ 2', 'Π. ΦΑΛΗΡΟ', '2109854262', '6945556197', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΛΕΚΚΑΣ ΣΠΥΡΙΔΩΝ', 'ΑΤΤΙΚΗΣ', 'ΕΥΕΡΓΕΤΩΝ 16', 'Π. ΦΑΛΗΡΟ', '2109826756', '6932859216/6948149851', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΧΑΝΔΡΑΣ ΚΩΝΣΤΑΝΤΙΝΟΣ', 'ΑΤΤΙΚΗΣ', 'ΑΤΛΑΝΤΟΣ 2', 'Π. ΦΑΛΗΡΟ', '2109881717', '6944 544343', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΑΡΒΑΝΙΤΗΣ', 'ΠΕΙΡΑΙΑ', 'ΕΥΡΙΠΙΔΟΥ 59-61', 'ΠΕΙΡΑΙΑΣ', '210 4100900', '6977 236732', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΒΟΓΙΑΤΖΑΚΗ', 'ΠΕΙΡΑΙΑ', 'ΦΙΛΙΚΗΣ ΕΤΑΙΡΕΙΑΣ 35 Α', 'ΠΕΙΡΑΙΑΣ', '210 4184194', '6945 317819', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΚΑΝΑΚΑΚΗΣ ΛΟΥΚΑΣ', 'ΠΕΙΡΑΙΑ', 'ΚΟΥΝΤΟΥΡΙΩΤΟΥ 227', 'ΠΕΙΡΑΙΑΣ', '210 4512617', '6942 290865', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΜΙΧΑΛΟΔΗΜΗΤΡΑΚΗΣ ΔΗΜΟΣΘΕΝΗΣ', 'ΠΕΙΡΑΙΑ', 'ΑΝΔΡΟΥΤΣΟΥ 69', 'ΠΕΙΡΑΙΑΣ', '210 4111386', '6930 792789', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΡΑΜΑΝΤΑΝΗ', 'ΠΕΙΡΑΙΑ', 'ΑΚΤΗ ΜΟΥΤΣΟΠΟΥΛΟΥ 52', 'ΠΕΙΡΑΙΑΣ', '210 4523632', '6948 500656', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΣΤΑΥΡΟΥΛΑΚΗΣ ΣΠΥΡΙΔΩΝ', 'ΠΕΙΡΑΙΑ', 'ΦΛΕΣΣΑ 34', 'ΠΕΙΡΑΙΑΣ', '211 4016042', '6979 334632', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΤΣΑΜΑΔΟΥ ΛΙΤΣΑ', 'ΠΕΙΡΑΙΑ', 'ΑΙΓΑΛΕΩ 49', 'ΠΕΙΡΑΙΑΣ', '210 4624392', '6932 220034', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΤΣΕΓΚΟΣ Α. - ΓΙΑΝΝΑΚΑΚΟΥ Α. Ο.Ε.', 'ΠΕΙΡΑΙΑ', 'ΓΡΗΓΟΡΙΟΥ ΛΑΜΠΡΑΚΗ 54-56', 'ΠΕΙΡΑΙΑΣ', '2110124251', '6937353506', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΦΑΦΑΛΙΟΣ ΘΕΟΔΩΡΟΣ &ΣΙΑ Ο.Ε.', 'ΠΕΙΡΑΙΑ', 'ΗΡ. ΠΟΛΥΤΕΧΝΕΙΟΥ 64', 'ΠΕΙΡΑΙΑΣ', '210 4525900', '6937204420', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΦΡΟΝΗ ΜΑΡΙΑ', 'ΠΕΙΡΑΙΑ', 'ΣΑΧΤΟΥΡΗ &ΚΟΥΝΤΟΥΡΙΩΤΟΥ 267', 'ΠΕΙΡΑΙΑΣ', '210 4599572', '6973 905377', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΚΤΗΝΙΑΤΡΙΚΟ ΚΕΝΤΡΟ ΚΑΣΤΕΛΛΑΣ', 'ΠΕΙΡΑΙΑΣ', 'ΠΑΝΑΓΙΑΣ ΜΥΡΤΙΔΙΩΤΙΣΣΗΣ 8', 'ΠΕΙΡΑΙΑΣ', '211847273', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΛΟΡΕΝΤΖΟΣ ΓΕΩΡΓΙΟΣ', 'ΠΕΙΡΑΙΑ', 'ΜΗΤΡΩΟΥ 4', 'ΠΕΙΡΑΙΑΣ', '210 4539214', '6937 055798', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΣΟΥΛΑΣ', 'ΠΕΙΡΑΙΑ', 'ΣΠΥΡΟΥ ΛΑΜΠΡΟΥ 49', 'ΠΕΙΡΑΙΑΣ-ΚΑΛΛΙΠΟΛΗ', '210 4287187', '6932655998', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΣΙΓΑΛΑ ΤΕΡΨΙΧΟΡΗ', 'ΠΕΙΡΑΙΑ', 'ΧΑΤΖΗΚΥΡΙΑΚΟΥ ΜΑΡΙΑΣ 93', 'ΠΕΙΡΑΙΚΗ', '2104285732', '6932533630', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina3, 'ΣΤΕΦΑΝΙΑ ΡΑΜΠΙΔΗ', NULL, 'Ολύμπου 29', 'ΒΡΙΛΙΣΣΙΑ', NULL, NULL, NULL);
  -- ΑΘΗΝΑ 4
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΑΝΑΓΝΩΣΤΟΠΟΥΛΟΥ ΣΤΑΜΑΤΙΝΑ', 'ΑΤΤΙΚΗΣ', 'Λ. ΙΩΝΙΑΣ 113', 'ΑΛΙΜΟΣ', '210 9949810', '6974 917329', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΜΑΡΙΑ ΖΟΥΡΙΔΟΥ', 'ΑΤΤΙΚΗΣ', 'ΜΠΙΖΑΝΙΟΥ 10', 'ΑΛΙΜΟΣ', '2167002885', '6940940140', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΜΑΡΚΟΥ ΜΙΛΤΙΑΔΗΣ', 'ΑΤΤΙΚΗΣ', 'ΛΕΩΦ. ΕΛΕΥΘΕΡΙΑΣ 24 &ΤΑΞΙΑΡΧΩΝ 9', 'ΑΛΙΜΟΣ', '210 9817030', '6944609000', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΠΑΠΑΔΟΓΙΑΝΝΑΚΗΣ ΕΜΜΑΝΟΥΗΛ', 'ΑΤΤΙΚΗΣ', 'ΚΡΥΣΤΑΛΛΗ 2', 'ΑΛΙΜΟΣ', '2109837101', '6932445741', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΤΡΙΑΝΤΑΦΥΛΛΟΥ ΑΓΓΕΛΙΚΗ', 'ΑΤΤΙΚΗΣ', 'ΕΥΒΟΙΑΣ 37', 'ΑΛΙΜΟΣ', '210 9845377', '6932 352633', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΤΣΑΧΑΚΗΣ ΙΩΑΝΝΗΣ', 'ΑΤΤΙΚΗΣ', 'ΔΩΔΕΚΑΝΗΣΟΥ 67', 'ΑΛΙΜΟΣ', '2130341929', '6973 494425', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΧΑΤΖΗΘΕΟΔΩΡΟΓΛΟΥ ΧΛΟΗ', 'ΑΤΤΙΚΗΣ', 'ΚΝΩΣΣΟΥ 70', 'ΑΛΙΜΟΣ', '210-9855702', '6972551824', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΓΡΗΓΟΡΟΠΟΥΛΟΣ ΧΡΗΣΤΟΣ', 'ΑΤΤΙΚΗΣ', 'ΘΟΥΚΥΔΙΔΟΥ 65', 'ΑΛΙΜΟΣ', '210 9855470', '6973 494425     6939 493923', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΣΚΟΥΡΟΓΙΑΝΝΗΣ ΔΗΜΗΤΡΙΟΣ', 'ΑΤΤΙΚΗΣ', 'Λ. ΜΑΡΑΘΩΝΟΣ 11', 'ΑΝΟΙΞΗ', '2106218055', '6973339695 / 6932423648', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΤΣΑΓΚΛΗΣ ΚΩΝΣΤΑΝΤΙΝΟΣ', 'ΑΤΤΙΚΗΣ', 'ΦΛΕΜΙΝΓΚ 3', 'ΑΝΟΙΞΗ', '210 6218709', '6932833736', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΚΟΥΤΟΥΓΕΡΑ ΜΑΝΙΑ', 'ΑΤΤΙΚΗΣ', 'ΧΑΡΟΚΟΠΟΥ 32', 'ΚΑΛΛΙΘΕΑ', NULL, '6955851733', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΜΠΑΜΠΙΛΗ ΝΙΚΗ', 'ΑΤΤΙΚΗΣ', 'ΔΗΜΟΣΘΕΝΟΥΣ 69', 'ΚΑΛΛΙΘΕΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΠΕΡΔΙΚΟΥΡΗΣ ΔΙΟΝΥΣΗΣ', 'ΑΤΤΙΚΗΣ', 'ΜΕΝΕΛΑΟΥ 104', 'ΚΑΛΛΙΘΕΑ', NULL, '697 3239411', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΠΟΥΛΟΥΤΙΑΔΗΣ ΑΠΟΣΤΟΛΟΣ', 'ΑΤΤΙΚΗΣ', 'ΚΟΛΟΚΟΤΡΩΝΗ   1', 'ΚΑΛΛΙΘΕΑ', NULL, '6947 370484', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΡΟΜΠΟΤΗΣ ΣΤΑΘΗΣ', 'ΑΤΤΙΚΗΣ', 'ΔΑΒΑΚΗ 8', 'ΚΑΛΛΙΘΕΑ', NULL, '6947674582', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΚΑΜΠΟΥΡΗΣ ΙΩΑΝΝΗΣ', 'ΑΤΤΙΚΗΣ', 'ΞΕΝΟΦΩΝΤΟΣ 2', 'ΚΑΛΛΙΘΕΑ', '2109518981', '6932894433', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΚΑΤΣΟΓΙΑΝΝΟΣ ΓΙΩΡΓΟΣ', 'ΑΤΤΙΚΗΣ', 'ΣΑΠΦΟΥΣ 83', 'ΚΑΛΛΙΘΕΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΔΑΝΑ', 'ΑΤΤΙΚΗΣ', 'ΞΕΝΟΦΩΝΤΟΣ 126', 'ΚΑΛΛΙΘΈΑ', NULL, '6948725806', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'HOSPETAL ΓΑΡΜΠΗΣ', 'ΑΤΤΙΚΗΣ', 'ΣΥΓΓΡΟΥ 226', 'ΚΑΛΛΙΘΈΑ', NULL, '694350815', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΠΑΠΑΓΕΩΡΓΊΟΥ', 'ΑΤΤΙΚΗΣ', NULL, 'ΚΕΡΑΤΕΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΛΥΓΙΑΣ ΝΕΟΦΎΤΟΥ', 'ΑΤΤΙΚΗΣ', 'ΙΩΑΝΝΗ ΠΡΙΦΤΗ &ΑΝΑΠΑΥΣΕΩΣ 18', 'ΚΕΡΑΤΕΑ', '2299304404', '6942728', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΠΑΠΑΓΕΩΡΓΙΟΥ ΔΗΜΗΤΡΗΣ', 'ΑΤΤΙΚΗΣ', 'ΛΙΟΥΜΗ ΔΗΜΗΤΡΙΟΥ 5', 'ΚΕΡΑΤΕΑ', '2299067494', '6946505545', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΝΕΣΤΟΡΙΔΟΥ ΧΡΥΣΟΥΛΑ', 'ΑΤΤΙΚΗΣ', 'ΘΕΟΦΡΑΣΤΟΥ 21', 'ΚΕΡΑΤΣΙΝΙ', '2104620056', '6974968852', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΛΑΓΑΝΗ ΜΑΡΙΑ', 'ΠΕΙΡΑΙΑ', 'ΡΗΓΑ ΦΕΡΡΑΙΟΥ 72', 'ΚΕΡΑΤΣΙΝΙ', '210 4010770', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΓΙΝΑΡΓΥΡΟΣ ΝΙΚΟΣ', 'ΠΕΙΡΑΙΑ', 'ΑΝΑΠΑΥΣΕΩΣ 81', 'ΚΕΡΑΤΣΙΝΙ', '210 4625036', '6973 404931', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΤΕΚΕΛΗΣ ΓΙΩΡΓΟΣ', 'ΑΤΤΙΚΗΣ', 'ΓΡ. ΛΑΜΠΡΑΚΗ 414', 'ΚΕΡΑΤΣΙΝΙ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'SURGIVETS', 'ΑΤΤΙΚΗΣ', 'ΣΤΡΑΤΗΓΟΥ ΜΑΚΡΥΓΙΆΝΝΗ 20', 'ΜΟΣΧΑΤΟ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΦΕΡΛΕΜΗΣ ΔΗΜΗΤΡΙΟΣ', 'ΑΤΤΙΚΗΣ', 'ΧΡΥΣΟΣΤΌΜΟΥ ΣΜΥΡΝΗΣ 9', 'ΜΟΣΧΑΤΟ', '2109400130', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΜΠΙΤΖΑΣ ΧΡΗΣΤΟΣ', 'ΑΤΤΙΚΗΣ', 'Λ. ΚΑΤΣΩΝΗ 46', 'ΜΟΣΧΑΤΟ', '2104817055', '6932539235', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΔΗΜΗΤΡΙΑΔΗΣ ΑΝΑΣΤΑΣΙΟΣ', 'ΑΤΤΙΚΗΣ', 'ΠΛΑΠΟΥΤΑ 95', 'Ν. ΗΡΑΚΛΕΙΟ', '210 2832156', '6944 290342', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΖΕΡΒΕΑΣ ΑΛΕΞΑΝΔΡΟΣ', 'ΑΤΤΙΚΗΣ', 'ΟΔΟΣ ΚΗΦΙΣΙΑΣ 50Α', 'Ν. ΗΡΑΚΛΕΙΟ', '210 2756207', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΚΟΥΣΙΣΗΣ', 'ΑΤΤΙΚΗΣ', 'ΕΛ. ΒΕΝΙΖΕΛΟΥ 2', 'Ν. ΗΡΑΚΛΕΙΟ', '210 2823514', '6944 643804', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΚΤΕΝΑΣ', 'ΑΤΤΙΚΗΣ', 'Λ. ΗΡΑΚΛΕΙΟΥ 396', 'Ν. ΗΡΑΚΛΕΙΟ', '2102801070', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΒΑΛΜΑΣ ΜΑΡΙΟΣ', 'ΑΤΤΙΚΗΣ', 'ΑΧΑΙΩΝ 5', 'Ν. ΗΡΑΚΛΕΙΟ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΜΑΝΤΑΚΑ ΒΑΝΕΣΣΑ', 'ΑΤΤΙΚΗΣ', 'ΚΟΥΝΤΟΥΡΙΩΤΟΥ 20Α', 'Ν. ΗΡΑΚΛΕΙΟ', '210 2826969', '6973 341148', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΔΑΒΙΛΛΑ ΚΑΤΕΡΙΝΑ', 'ΑΤΤΙΚΗΣ', 'ΠΕΥΚΩΝ 139 & ΖΑΛΟΓΓΟΥ', 'Ν. ΗΡΑΚΛΕΙΟ', '210 2820202', '6936 664000', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΖΟΥΠΙΝΑ ΑΓΓΕΛΙΚΗ', 'ΑΤΤΙΚΗΣ', 'Μ. ΜΕΡΚΟΥΡΗ 22', 'Ν. ΗΡΑΚΛΕΙΟ', '210 2814340', '6972 886114', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΚΑΤΣΙΩΤΗ ΖΩΗ', 'ΑΤΤΙΚΗΣ', 'Λ. ΑΜΑΡΟΥΣΙΟΥ 20', 'Ν. ΗΡΑΚΛΕΙΟ', '210 2810330', '6947 497220', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΚΩΝΣΤΑΝΤΙΝΙΔΗΣ ΙΑΚΩΒΟΣ', 'ΑΤΤΙΚΗΣ', 'Λ. ΗΡΑΚΛΕΙΟΥ 367', 'Ν. ΗΡΑΚΛΕΙΟ', '210 2827018', '6932 223575', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'vet id ονόματα!!', NULL, 'Πεύκων 98', 'Ν.ΗΡΑΚΛΕΙΟ', '2102813647', NULL, 'Χρειάζεται έλεγχος ονομάτων');
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΧΑΤΖΗΠΕΤΡΟΥ ΕΛΕΥΘΕΡΙΟΣ', 'ΠΕΙΡΑΙΑ', 'ΚΑΝΙΓΓΟΣ 6', 'ΠΑΣΑΛΙΜΑΝΙ', '210 4114365', '6932735270', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_athina4, 'ΜΩΡΑΪΤΗ', 'ΑΤΤΙΚΗΣ', 'ΤΙΜΟΘΕΟΥ', 'ΤΑΥΡΟΣ', '2103421987', '6936305602', NULL);
  -- ΕΥΒΟΙΑ
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΠΑΠΑΓΓΕΛΗ ΚΛΕΟΝΗ', 'ΑΤΤΙΚΗΣ', 'ΦΙΛΑΔΕΛΦΕΙΑΣ 125', 'ΑΧΑΡΝΑΙ', '2102404884', '6948533721', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΑΘΑΝΑΣΙΟΥ ΕΙΡΗΝΗ', 'ΑΤΤΙΚΗΣ', 'ΣΟΛΩΜΟΥ 15', 'ΔΡΟΣΙΑ', '210 8130224', '6972377414', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΓΚΙΟΚΑ ΚΩΝΣΤΑΝΤΙΝΑ', 'ΑΤΤΙΚΗΣ', 'ΓΥΦΤΑΙΑ 40', 'ΕΛΕΥΣΙΝΑ', '210 5540256', '6937456638', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΚΑΝΑΒΟΣ ΘΕΟΔΩΡΟΣ', 'ΑΤΤΙΚΗΣ', 'ΙΩΑΝΝΟΥ ΑΓΑΘΟΥ 29', 'ΕΛΕΥΣΙΝΑ', '210 5541321', '6932814472', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΚΟΝΔΥΛΗ Δ. ΕΛΕΝΗ', 'ΑΤΤΙΚΗΣ', 'ΜΟΥΡΙΚΗ 51', 'ΕΛΕΥΣΙΝΑ', '211 0135632', '6948 729131', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΠΑΠΑΘΑΝΑΣΙΟΥ - ΚΟΥΦΑΣΙΜΗΣ Ο.Ε.', 'ΑΤΤΙΚΗΣ', 'ΛΕΩΦ. ΕΘΝ. ΑΝΤΙΣΤΑΣΕΩΣ 118', 'ΕΛΕΥΣΙΝΑ', '210 5545074', '6977659803', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΑΘΑΝΑΣΑΙΝΑ ΑΝΤΩΝΙΑ', 'ΑΤΤΙΚΗΣ', 'Λ. ΚΑΛΑΜΟΥ 32', 'ΚΑΠΑΝΔΡΙΤΙ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΑΛΕΞΟΠΟΥΛΟΥ ΚΑΡΑΓΚΟΥΝΗ', NULL, 'ΠΑΝΑΙΤΩΛΙΟΥ 18', 'Ν.ΙΩΝΙΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΑΤΤΑΛΙΔΟΥ ΠΗΓΗ(έλεγχος περιφέρεια', 'ΑΤΤΙΚΗΣ', 'Κώστα Βάρναλη 57', 'Ν.ΙΩΝΙΑ', NULL, NULL, 'Έλεγχος περιφέρεια');
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΛΕΒΕΝΤΟΓΙΑΝΝΗΣ-ΠΙΣΠΙΡΗΣ Vet Diagnosis Scan', 'ΑΤΤΙΚΗΣ', 'ΡΟΔΟΥ 46', 'Ν.ΙΩΝΙΑ', '2108015710', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΠΑΙΔΑΣ Ε. ΑΔΑΜΑΝΤΙΟΣ', 'ΑΤΤΙΚΗΣ', 'ΑΡΧ. ΧΡ. ΠΑΠΑΔΟΠΟΥΛΟΥ 10', 'ΝΕΑ ΦΙΛΑΔΕΛΦΕΙΑ', '2102517540', '6974736999', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΠΑΝΑΓΙΩΤΗΣ ΑΝΔΡΕΟΠΟΥΛΟΣ(έλεγχος περιφέρεια)', NULL, 'ΔΕΜΙΔΕΡΣΙΟΥ 2', 'ΠΕΡΙΣΣΟΣ ΝΕΑ ΙΩΝΙΑ', NULL, NULL, 'Έλεγχος περιφέρεια');
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΞΟΥΡΑΦΑΣ ΠΑΝΑΓΙΩΤΗΣ ΓΕΩΡΓΙΟΥ ΜΑΡΙΑ', NULL, 'Λ.ΕΙΡΗΝΗΣ', 'ΠΟΛΥΔΕΝΔΡΙ ΚΑΠΑΝΔΡΙΤΗ', '2295053680', '6932515086', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΣΑΡΑΠΗΣ ΒΑΣΙΛΗΣ', 'ΑΤΤΙΚΗΣ', 'ΑΓ. ΙΩΑΝΝΟΥ 52', 'ΡΟΔΟΠΟΛΗ', '210 6212221', '6947 810003', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΜΙΧΑΗΛ ΑΝΝΕΤΑ', NULL, NULL, NULL, NULL, '2295053144 ; Κινητό: 6937315957', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΠΑΠΑΘΑΝΑΣΙΟΥ ΔΗΜΗΤΡΑ', 'ΒΟΙΩΤΙΑΣ', 'ΤΑΝΑΓΡΑΣ 2', 'ΣΧΗΜΑΤΑΡΙ', '2262055407', '6974999360', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΦΡΥΔΑ ΒΑΣΙΛΙΚΗ', NULL, NULL, 'ΑΤΑΛΑΝΤΗ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΚΩΝΣΤΑΝΤΙΝΟΥ ΑΝΑΣΤΑΣΙΟΣ', NULL, 'ΜΙΚΡΑΣ ΑΣΙΑΣ 17', 'ΝΕΑ ΠΑΛΑΤΙΑ ΩΡΟΠΟΥ', '2295030500', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΔΗΜΗΤΡΙΟΥ ΞΕΝΙΑ', NULL, NULL, 'ΔΗΛΕΣΙ', '2262033811', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΜΠΟΥΚΟΥΒΑΛΑΣ ΘΩΜΑΣ', NULL, 'ΛΕΩΦ ΔΗΛΕΣΙΟΥ-ΧΑΛΚΟΥΤΣΙΟΥ', 'ΔΗΛΕΣΙ', '6974701043', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΠΑΠΠΑΣ ΠΑΝΑΓΙΩΤΗΣ', 'ΕΥΒΟΙΑΣ', 'ΔΡΟΣΙΑ', 'ΔΡΟΣΙΑ ΧΑΛΚΙΔΑΣ', NULL, '6945 596563', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΟΙΚΟΝΟΜΟΠΟΥΛΟΥ ΛΗΔΑ', 'ΕΥΒΟΙΑΣ', 'Κ. ΚΑΡΑΜΑΝΛΗ 60', 'ΕΡΕΤΡΙΑ', NULL, '6932 814472', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΤΣΑΛΙΚΗ ΜΑΡΙΑ', 'ΕΥΒΟΙΑΣ', 'ΧΑΤΖΗΔΑΚΗ 12', 'ΕΡΕΤΡΙΑ', '2229062383', '6932371375', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΚΑΣΤΡΙΝΟΣ ΑΝΑΣΤΑΣΙΟΣ', 'ΕΥΒΟΙΑΣ', '25ης ΜΑΡΤΙΟΥ', 'ΙΣΤΙΑΙΑ', '2226052600', '6980995940', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΠΑΠΑΤΡΙΑΝΤΑΦΥΛΛΟΥ ΔΗΜΗΤΡΗΣ', 'ΕΥΒΟΙΑΣ', 'ΜΑΝΤΟΥΔΙ ΕΥΒΟΙΑΣ', 'ΙΣΤΙΑΙΑ', '2226055557', '6937 065747 / 6945507453', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΤΣΙΤΣΙΓΚΟΣ ΓΙΩΡΓΟΣ', 'ΕΥΒΟΙΑΣ', 'ΚΟΡΦΙΑΤΗ ΑΘ. 80', 'ΙΣΤΙΑΙΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΦΛΩΡΟΣ ΠΕΤΡΟΣ', 'ΕΥΒΟΙΑΣ', 'ΑΘ. ΚΟΡΦΙΑΤΗ 43', 'ΙΣΤΙΑΙΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΚΙΟΥΣΗΣ ΚΩΝ. ΓΕΩΡΓΙΟΣ', 'ΕΥΒΟΙΑΣ', 'Λ. ΒΟΥΔΟΥΡΗΣ 13', 'Ν. ΑΡΤΑΚΗ', '6973039177', NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΜΟΛΥΒΙΑΤΗΣ ΘΕΟΦΙΛΟΣ', 'ΕΥΒΟΙΑΣ', '7ο ΧΛΜ ΧΑΛΚΙΔΑΣ-Ν. ΑΡΤΑΚΗΣ', 'Ν. ΑΡΤΑΚΗ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΤΣΑΛΑΜΑΝΙΟΣ ΤΑΣΟΣ', 'ΕΥΒΟΙΑΣ', 'ΒΥΡΩΝΟΣ 14', 'Ν. ΑΡΤΑΚΗ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΖΑΧΑΡΟΠΟΥΛΟΙ ΑΦΟΙ ΟΕ', 'ΕΥΒΟΙΑΣ', 'ΛΙΛΑΝΤΙΩΝ 113', 'ΧΑΛΚΙΔΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΚΑΨΟΥΛΗΣ-ΣΒΟΡΩΝΟΣ', 'ΕΥΒΟΙΑΣ', 'ΘΗΡΑΣ & ΚΕΡΚΥΡΑΣ', 'ΧΑΛΚΙΔΑ', '2221084632', '6948240810', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΝΙΚΟΛΕΤΖΟΣ Ι.-ΚΑΠΕΛΙΕΡΗΣ Γ. Ο.Ε.', 'ΕΥΒΟΙΑΣ', 'Λ. ΔΡΟΣΙΑΣ 50', 'ΧΑΛΚΙΔΑ', '2221037699', '6972776007 / 6974498155', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΤΑΠΟΥΤΗ ΕΙΡΗΝΗ', 'ΕΥΒΟΙΑΣ', 'ΠΟΛΥΤΕΧΝΕΙΟΥ 1', 'ΧΑΛΚΙΔΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΓΕΡΟΝΤΙΤΗΣ ΚΩΝ/ΝΟΣ', 'ΕΥΒΟΙΑΣ', 'ΛΙΑΝΗ ΑΜΜΟΣ 487', 'ΧΑΛΚΙΔΑ', NULL, NULL, NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΜΑΝΟΥΣΟΥ ΤΖΕΝΗ', 'ΕΥΒΟΙΑΣ', 'ΣΤΥΡΩΝ 23', 'ΧΑΛΚΙΔΑ', '2221020605', '6973880385', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΠΑΛΑΜΙΔΑ ΧΡΥΣΑΝΘΗ', 'ΕΥΒΟΙΑΣ', '28Ης ΟΚΤΩΒΡΙΟΥ 27', 'ΧΑΛΚΙΔΑ', '2221084053', '6984093818', NULL);
  INSERT INTO clients (route_id, name, region, address, city, phone, mobile, notes)
    VALUES (r_evia, 'ΜΑΝΤΗΣ', 'ΑΤΤΙΚΗΣ', 'ΜΑΡΑΘΩΝΟΣ &ΣΑΛΑΜΙΝΟΣ 6', 'ΝΕΑ ΦΙΛΑΔΕΛΦΕΙΑ', NULL, NULL, NULL);
END $$;

-- ── UPDATED SCHEDULE (40 route-weeks, all Mondays) ──
-- Run this to replace the old schedule with Monday-based dates
DELETE FROM schedule;

DO $$
DECLARE
  rid UUID;
  cid UUID;
BEGIN
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 1';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 1 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-03-02', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 2';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 1 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-03-09', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 3';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 1 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-03-16', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 4';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 1 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-03-23', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΕΥΒΟΙΑ';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 1 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-03-30', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 1';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 2 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-04-06', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 2';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 2 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-04-13', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 3';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 2 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-04-20', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 4';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 2 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-04-27', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΕΥΒΟΙΑ';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 2 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-05-04', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 1';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 3 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-05-11', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 2';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 3 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-05-18', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 3';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 3 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-05-25', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 4';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 3 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-06-01', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΕΥΒΟΙΑ';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 3 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-06-08', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 1';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 4 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-06-15', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 2';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 4 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-06-22', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 3';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 4 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-06-29', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 4';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 4 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-07-06', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΕΥΒΟΙΑ';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 4 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-07-13', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 1';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 5 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-07-20', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 2';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 5 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-07-27', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 3';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 5 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-08-31', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 4';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 5 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-09-07', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΕΥΒΟΙΑ';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 5 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-09-14', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 1';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 6 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-09-21', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 2';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 6 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-09-28', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 3';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 6 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-10-05', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 4';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 6 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-10-12', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΕΥΒΟΙΑ';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 6 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-10-19', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 1';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 7 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-10-26', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 2';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 7 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-11-02', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 3';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 7 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-11-09', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 4';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 7 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-11-16', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΕΥΒΟΙΑ';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 7 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-11-23', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 1';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 8 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-11-30', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 2';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 8 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-12-07', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 3';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 8 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-12-14', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΑΘΗΝΑ 4';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 8 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-12-21', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
  SELECT id INTO rid FROM routes WHERE name = 'ΕΥΒΟΙΑ';
  SELECT id INTO cid FROM cycles WHERE cycle_number = 8 AND year = 2026;
  INSERT INTO schedule (visit_date, route_id, cycle_id) VALUES ('2026-12-28', rid, cid) ON CONFLICT (visit_date) DO NOTHING;
END $$;

-- ── PRE-EXISTING VISITS (27 recorded visits) ──
DO $$
DECLARE
  clt_id UUID;
BEGIN
  SELECT id INTO clt_id FROM clients WHERE name = 'ΜΑΥΡΟΠΟΥΛΟΥ ΟΛΓΑ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-02-26', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΜΠΟΥΡΜΠΟΥ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-02-26', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΝΙΖΑΜΗ ΕΥΑΓΓΕΛΙΑ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-02-26', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΠΑΣΠΑΡΑΚΗ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-02-26', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΠΑΣΠΑΡΑΚΗ ΜΑΡΙΑ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-02-26', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΑΝΑΓΝΩΣΤΟΠΟΥΛΟΣ ΧΑΡΑΛΑΜΠΟΣ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-02', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΚΑΖΛΑΡΗ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-02', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΛΑΓΟΥΔΑΚΗ ΧΡΥΣΑ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-02', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΜΑΥΡΟΠΟΥΛΟΥ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-02', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΜΗΤΣΗΣ ΒΑΣΙΛΗΣ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-02', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΝΤΕΒΕ ΜΑΡΙΑ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-02', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΠΑΝΟΣ ΧΑΡΑΛΑΜΠΟΣ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-02', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΦΙΛΙΠΠΟΠΟΥΛΟΣ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-02', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΦΛΑΚΑΣ ΑΝΑΣΤΑΣΙΟΣ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-03', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΑΥΔΗΣ ΣΤΑΥΡΟΣ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-04', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΓΕΩΡΓΟΥΛΗΣ ΚΩΝΣΤΑΝΤΙΝΟΣ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-04', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΓΚΑΝΤΑΙΦΗΣ ΔΗΜΗΤΡΙΟΣ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-04', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΜΠΟΥΝΤΑΣ ΑΝΑΣΤΑΣΙΟΣ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-04', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΣΒΑΝΙΑΣ ΜΙΛΤΙΑΔΗΣ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-04', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΤΣΟΜΛΕΚΤΣΟΓΛΟΥ Ι. ΜΙΧΑΗΛ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-04', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΚΕΦΑΛΑ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-05', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΞΕΝΟΣ ΙΩΑΝΝΗΣ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-05', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΠΑΠΑΔΕΑ ΗΛΕΚΤΡΑ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-05', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΠΑΠΠΟΥΣ ΠΑΝΑΓΙΩΤΗΣ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-05', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΠΡΟΚΟΠΙΟΥ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-05', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΛΑΨΑΝΗ' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-06', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
  SELECT id INTO clt_id FROM clients WHERE name = 'ΣΙΔΕΡΑΣ Δ. ΧΑΝΤΑΝΤ & Η ΣΙΔΕΡΑΣ ΧΑΝΤΑΝΤ ΟΕ (ΚΟΜΒΟ VET)' AND route_id = (SELECT id FROM routes WHERE name = 'ΑΘΗΝΑ 1') LIMIT 1;
  IF clt_id IS NOT NULL THEN
    INSERT INTO visits (client_id, visit_date, status) VALUES (clt_id, '2026-03-06', 'completed') ON CONFLICT (client_id, visit_date) DO NOTHING;
  END IF;
END $$;