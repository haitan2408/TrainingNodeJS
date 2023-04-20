export class TennisGame {
    private readonly MAX_SCORE = 4;
    private readonly ONE = 1;
    private readonly TWO = 2;
    private readonly THREE = 3;
    private readonly ZERO = 0;


    private getScoreString(score: number) {
        switch (score) {
            case this.ZERO:
                return "Love";
            case this.ONE:
                return "Fifteen";
            case this.TWO:
                return "Thirty";
            case this.THREE:
                return "Forty";
            default:
                return "Deuce";
        }
    }

    getScore(player1Name: string,
             player2Name: string,
             mScore1: number,
             mScore2: number) {

        if (mScore1 == mScore2) {
            return this.getScoreString(mScore1) + " - ALL"
        } else if (mScore1 >= this.MAX_SCORE || mScore2 >= this.MAX_SCORE) {
            const minusResult = mScore1 - mScore2;
            if (minusResult == 1) {
                return "Advantage player1";
            } else if (minusResult == -1) {
                return "Advantage player2";
            } else if (minusResult >= 2) {
                return "Win for player1";
            } else {
                return "Win for player2";
            }
        } else {
            let score = "";
            let tempScore = 0;
            for (let i = 1; i < 3; i++) {
                if (i == 1)
                    tempScore = mScore1;
                else {
                    score += "-";
                    tempScore = mScore2;
                }
                score += this.getScoreString(tempScore);
            }
            return score;
        }
    }
}
