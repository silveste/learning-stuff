package org.silveste;


// Requirements:
// - JDBC SQlite Driver
// - ENV Variable required DB_PATH

import org.silveste.model.Artist;
import org.silveste.model.Datasource;
import org.silveste.model.Song;
import org.silveste.model.SongArtist;

import java.util.List;

public class Main {

    public static void main(String[] args) {
        Datasource ds = new Datasource();
        ds.open();
        List<Artist> artists = ds.queryArtist(Datasource.ORDER_BY_NONE);
        if (artists == null) {
            System.out.println("No artits!!");
            return;
        }

        for (Artist artist : artists ) {
            System.out.println("ID: " + artist.getId() + ", Name: " + artist.getName());
        }

        List<String> albumsForArtists = ds.queryAlbumsForArtist("Pink Floyd", Datasource.ORDER_BY_DESC);

        for (String album : albumsForArtists){
            System.out.println(album);
        }


        List<SongArtist> sas = ds.queryArtistForSong("Heartless", Datasource.ORDER_BY_ASC);
        if(sas == null){
            System.out.println("Couldn't find the artist for that song");
            return;
        }

        for (SongArtist sa : sas){
            System.out.println("Artist Name: " + sa.getArtisName() +
                    " Album Name: " + sa.getAlbumName() +
                    " Track: " + sa.getTrack());
        }

        ds.querySongsMetadata();

        System.out.println("Number of songs is: " +
        ds.getCount(Datasource.TABLE_SONGS));

        ds.createViewForSongArtists();

        sas = ds.querySongInfoView("Go Your Own Way");
        if (sas.isEmpty()){
            System.out.println("Couldn't find the artist for that song");
            return;
        }

        for (SongArtist sa : sas){
            System.out.println("FROM VIEW: - Artist Name: " + sa.getArtisName() +
                    " Album Name: " + sa.getAlbumName() +
                    " Track: " + sa.getTrack());
        }

        ds.close();
    }
}
