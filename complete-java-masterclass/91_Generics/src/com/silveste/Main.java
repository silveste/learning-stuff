package com.silveste;

public class Main {

    public static void main(String[] args) {
	// write your code here
        League<Team<FootballPlayer>> footballLeage = new League<>("La Liga");
        Player silva = new FootballPlayer("E. Silva");
        FootballPlayer sousa = new FootballPlayer("I. Sousa");
        FootballPlayer moran = new FootballPlayer("P. Moran");
        FootballPlayer mccormack = new FootballPlayer("C. McCormack");
        FootballPlayer kelleher = new FootballPlayer("K. Kelleher");
        FootballPlayer alonso = new FootballPlayer("M. Alonso");
        Player mora = new BasketballPlayer("L. Mora");
        BasketballPlayer fernandez = new BasketballPlayer("S. Fernandez");

        Team<FootballPlayer> deportivo = new Team<>("Deportivo de la Coruña");
        deportivo.addPlayer((FootballPlayer) silva);
        //deportivo.addPlayer(fernandez);
        //deportivo.addPlayer((FootballPlayer) mora);
        Team<FootballPlayer> madrid = new Team<>("Real Madrid");
        deportivo.addPlayer(sousa);
        Team<FootballPlayer> barcelona = new Team<>("Barcelona FC");
        deportivo.addPlayer(moran);
        Team<FootballPlayer> sevilla = new Team<>("Sevilla FC");
        deportivo.addPlayer(mccormack);
        Team<FootballPlayer> celta = new Team<>("Celta de Vigo");
        deportivo.addPlayer(kelleher);
        Team<FootballPlayer> atleti = new Team<>("Atletico de Madrid");
        deportivo.addPlayer(alonso);

        footballLeage.add(deportivo);
        footballLeage.add(madrid);
        footballLeage.add(barcelona);
        footballLeage.add(sevilla);
        footballLeage.add(celta);
        footballLeage.add(atleti);

        deportivo.matchResult(madrid, 5, 0);
        barcelona.matchResult(sevilla, 1, 2);
        celta.matchResult(atleti, 2, 1);
        atleti.matchResult(deportivo, 2, 2);
        madrid.matchResult(barcelona, 3, 3);
        sevilla.matchResult(celta, 2, 3);
        deportivo.matchResult(sevilla, 2, 0);
        barcelona.matchResult(atleti, 1, 4);
        celta.matchResult(madrid, 2, 2);

        footballLeage.showLeagueTable();

    }
}
