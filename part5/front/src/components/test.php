<form>
    <div class="wlk-main-form-part">
        <div class="wlk-form-questions-1">
            <label>Όνομα<input name="name" type="text" required /></label>
            <label>Επίθετο<input name="surname" type="text" required /></label>
            <label>Κινητό<input name="mobile_no" type="tel" required /></label>
            <label>Email<input name="email" type="email" required /></label>
        </div>
        <div class="wlk-form-questions-2">
            <label>Super Market<input name="super_market" type="text" required /></label>
            <label>IBAN<input name="iban" type="text" required /></label>
            <label>Ποσό<input name="amount" type="number" required min="0" max="15" /></label>
            <div class="wlk-form-file">
                <label for="receipt"><p>Ανέβασε την απόδειξη: <span>(Τύποι αρχείου: jpeg, png, pdf)</span></p></label>
                <a>Δες παραδείγματα αποδείξεων</a>
                <div><button>UPLOAD </button><input name="receitp" type="file" accept="image/jpeg, image/png, image/jpg" required /></div>
            </div>
            <label>Συμφωνώ να χρησιμοποιήσετε τα παραπάνω δεδομένα μου για να λάβω μέρος στον διαγωνισμό Wilkinson Sword και δηλώνω ότι έχω διαβάσει & αποδεχτεί τους όρους του διαγωνισμού.<input type="checkbox" required value="consent" name="consent" /><span></span></label>
        </div>
    </div>
    <div class = "wlk-form-money-counter">
        <?php
        global $wpdb;
        $table_name = $wpdb->prefix . 'competition_entries';
        $entries = $wpdb->get_results( "SELECT amount FROM $table_name", ARRAY_A);
        $amount = 0;
        foreach($entries as $entry){
            $amount+=$entry['amount'];
        }
        $remaining_amount = 30000 - $amount;
        $amount_prc = (100*$amount)/30000;
        ?>
        <p>Απομένουν <b>€<?php echo number_format($remaining_amount, 2, ',', '.');?></b> από τα <b>€30.000</b></p>
        <div class = 'wlk-amount-bar-outer'>
            <div class = 'wlk-amount-bar-inner' style="width:<?php echo $amount_prc;?>%;"></div>
        </div>
        <div class = 'wlk-status-display-wrap'>
            <span><?php echo number_format($amount, 2, ',', '.');?>€</span><span>30000€</span>
        </div>
    </div>
    <div class = "wlk-form-questionaire">
        <h3 class="wlk-questionaire-counter">1/6</h3>
        <hr class="wlk-separator" />
        <div class = "wlk-questions-outer">
            <div class = "wlk-questions-wrap">
                <?php 
                $levels_of_like = ['Very poor', 'Poor', 'Average', 'Good', 'Very good'];

                $questions = [
                    [
                        'question' => 'Which razor did you test?',
                        'answers' => ['Wilkinson Sword', 'Wilkinson Sword Intuition'],
                        'target_id'=> 'eimwaf'
                    ],
                    [
                        'question' => 'How would you rate the closeness of the shave (smoothness of your skin)?',
                        'answers' => $levels_of_like,
                        'target_id' => 'txkqsi'
                    ],
                    [
                        'question' => 'How would you rate the comfort for your skin (lack of irritation)?',
                        'answers' => $levels_of_like,
                        'target_id' => 'csocfq'
                    ],
                    [
                        'question' => 'How would you rate the moisturizing/skincare effect after using the razor?',
                        'answers' => $levels_of_like,
                        'target_id' => 'qgvlhk'
                    ],
                    [
                        'question' => 'How would you rate the quality of this razor compared with the one you used previously?',
                        'answers' => ['Much worse', 'Slightly worse', 'About the same', 'Slightly better', 'Much better'],
                        'target_id' => 'jkzbva'
                    ],
                    [
                        'question' => 'How likely are you to consider purchasing this razor again or buying replacement blades for it?',
                        'answers' => ['Definitely would not', 'Probably would not', 'Not sure', 'Probably would', 'Definitely would'],
                        'target_id' => 'bvmlxu'
                    ]
                ];

                $question_no = 0;
                $answer_no = 0;
                foreach($questions as $question):?>
                    <div class="wlk-questionaire-question">
                        <p><span class="wlk-question-no"><?php echo $question_no + 1; ?>. </span><?php echo $question['question']; ?></p>
                        <div class="wlk-questionaire-answers">
                            <?php $answer_no = 0; ?>
                            <?php foreach($question['answers'] as $answer):?>
                                <label class="wlk-questionaire-input-label"><span class="wlk-questionaire-shown-input" ></span><input class="wlk-questionaire-input" data-target="<?php echo "form-field-".$question['target_id']; ?> " type="radio" id="<?php echo "qst-$question_no-ans-$answer_no"; $answer_no++; ?>" name="<?php echo "question-$question_no";?>" value="<?php echo $answer; ?>" /><?php echo $answer; ?></label>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <?php $question_no++; ?>
                <?php endforeach;?>
            </div>
        </div>
        <div class="qlk-questionaire-buttons wlk-first-question">
            <button class="wlk-prev-button"><img src="https://salmon-lark-610467.hostingersite.com/wp-content/uploads/2026/07/chevron.svg"> ΠΡΟΗΓΟΥΜΕΝΟ</button>
            <button class="wlk-next-button">ΕΠΟΜΕΝΟ <img src="https://salmon-lark-610467.hostingersite.com/wp-content/uploads/2026/07/chevron.svg"></button>
        </div>
    </div>
</form>

