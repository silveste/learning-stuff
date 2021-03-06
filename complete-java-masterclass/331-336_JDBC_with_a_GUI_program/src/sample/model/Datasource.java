package sample.model;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Datasource {
    public static final String DB_NAME = "music.db";
    public static final String DB_PATH = System.getenv("DB_PATH");
    public static final String CONNECTION_STRING = "jdbc:sqlite:" + DB_PATH + "/" + DB_NAME;

    public static final String TABLE_ALBUMS = "albums";
    public static final String COL_ALBUM_ID = "_id";
    public static final String COL_ALBUM_NAME = "name";
    public static final String COL_ALBUM_ARTIST = "artist";
    public static final int INDEX_ALBUM_ID = 1;
    public static final int INDEX_ALBUM_NAME = 2;
    public static final int INDEX_ALBUM_ARTIST = 3;

    public static final String TABLE_ARTISTS = "artists";
    public static final String COL_ARTIST_ID = "_id";
    public static final String COL_ARTIST_NAME = "name";
    public static final int  INDEX_ARTIST_ID = 1;
    public static final int  INDEX_ARTIST_NAME = 2;

    public static final String TABLE_SONGS = "songs";
    public static final String COL_SONG_ID = "_id";
    public static final String COL_SONG_TRACK = "track";
    public static final String COL_SONG_TITLE = "title";
    public static final String COL_SONG_ALBUM = "album";
    public static final int INDEX_SONG_ID = 1;
    public static final int INDEX_SONG_TRACK = 2;
    public static final int INDEX_SONG_TITLE = 3;
    public static final int INDEX_SONG_ALBUM = 4;

    public static final int ORDER_BY_NONE = 1;
    public static final int ORDER_BY_ASC = 2;
    public static final int ORDER_BY_DESC = 3;

    public static final String QUERY_ARTIS_FOR_SONG_START =
            "SELECT " + TABLE_ARTISTS + "." + COL_ARTIST_NAME + ", " +
                    TABLE_ALBUMS + "." + COL_ALBUM_NAME + ", " +
                    TABLE_SONGS + "." + COL_SONG_TRACK + " FROM " + TABLE_SONGS +
                    " INNER JOIN " + TABLE_ALBUMS + " ON " +
                    TABLE_SONGS + "." + COL_SONG_ALBUM + " = " + TABLE_ALBUMS + "." + COL_ALBUM_ID +
                    " INNER JOIN " + TABLE_ARTISTS + " ON " +
                    TABLE_ALBUMS + "." + COL_ALBUM_ARTIST + " = " + TABLE_ARTISTS + "." + COL_ARTIST_ID +
                    " WHERE " + TABLE_SONGS + "." + COL_SONG_TITLE + " = \"";
    public static final String QUERY_ARTIS_FOR_SONG_SORT =
            " ORDER BY " + TABLE_ARTISTS + "." + COL_ARTIST_NAME + ", " +
                    TABLE_ALBUMS + "." + COL_ALBUM_NAME + " COLLATE NOCASE ";

    public static final String TABLE_ARTIST_SONG_VIEW = "artist_list";
    public static final String CREATE_ARTIST_FOR_SONG_VIEW = "CREATE VIEW IF NOT EXISTS " +
            TABLE_ARTIST_SONG_VIEW + " AS SELECT " + TABLE_ARTISTS + "." + COL_ARTIST_NAME + ", " +
            TABLE_ALBUMS + "." + COL_ALBUM_NAME + " AS " + COL_SONG_ALBUM + ", " +
            TABLE_SONGS + "." + COL_SONG_TRACK + ", " + TABLE_SONGS + "." + COL_SONG_TITLE +
            " FROM " + TABLE_SONGS +
            " INNER JOIN " + TABLE_ALBUMS + " ON " + TABLE_SONGS +
            "." + COL_SONG_ALBUM + " = " + TABLE_ALBUMS + "." + COL_ALBUM_ID +
            " INNER JOIN " + TABLE_ARTISTS + " ON " + TABLE_ALBUMS + "." + COL_ALBUM_ARTIST +
            " = " + TABLE_ARTISTS + "." + COL_ARTIST_ID +
            " ORDER BY " +
            TABLE_ARTISTS + "." + COL_ARTIST_NAME + ", " +
            TABLE_ALBUMS + "." + COL_ALBUM_NAME + ", " +
            TABLE_SONGS + "." + COL_SONG_TRACK;

    public static final String QUERY_VIEW_SONG_INFO = "SELECT " + COL_ARTIST_NAME + ", " +
            COL_SONG_ALBUM + ", " + COL_SONG_TRACK + " FROM " + TABLE_ARTIST_SONG_VIEW +
            " WHERE " + COL_SONG_TITLE + " = \"";

    public static final String QUERY_VIEW_SONG_INFO_PREP = "SELECT " + COL_ARTIST_NAME + ", " +
            COL_SONG_ALBUM + ", " + COL_SONG_TRACK + " FROM " + TABLE_ARTIST_SONG_VIEW +
            " WHERE " + COL_SONG_TITLE + " = ?";

    public static final String  INSERT_ARTIST = "INSERT INTO " + TABLE_ARTISTS + '(' + COL_ARTIST_NAME + ") VALUES(?)";
    public static final String  INSERT_ALBUMS = "INSERT INTO " + TABLE_ALBUMS + '(' + COL_ALBUM_NAME + ", " + COL_ALBUM_ARTIST + ") VALUES(?, ?)";
    public static final String  INSERT_SONGS = "INSERT INTO " + TABLE_SONGS + '(' + COL_SONG_TRACK + ", " + COL_SONG_TITLE + ", " + COL_SONG_ALBUM + ") VALUES(?, ?, ?)";

    public static final String QUERY_ARTIST = "SELECT " + COL_ARTIST_ID + " FROM " + TABLE_ARTISTS + " WHERE " + COL_ARTIST_NAME + " = ?";
    public static final String QUERY_ALBUM = "SELECT " + COL_ALBUM_ID + " FROM " + TABLE_ALBUMS + " WHERE " + COL_ALBUM_NAME + " = ?";

    public static final String QUERY_ALBUMS_BY_ARTIST_ID = "SELECT * FROM " + TABLE_ALBUMS +
            " WHERE " + COL_ALBUM_ARTIST + " =  ? ORDER BY " + COL_ALBUM_NAME + " COLLATE NOCASE";

    public static final String  UPDATE_ARTIST_NAME = "UPDATE " + TABLE_ARTISTS + " SET " +
            COL_ARTIST_NAME + " = ? WHERE " + COL_ARTIST_ID + " = ?";

    private Connection  conn;

    private PreparedStatement querySongInfoView;
    private PreparedStatement insertIntoArtists;
    private PreparedStatement insertIntoAlbums;
    private PreparedStatement insertIntoSongs;

    private PreparedStatement queryArtist;
    private PreparedStatement queryAlbum;
    private PreparedStatement queryAlbumsByArtistId;
    private PreparedStatement updateArtistName;

    //Singleton pattern, only this class is able to create instances of itself
    private static Datasource instance = new Datasource(); //Makes it thread safe as the instance is intantiated inmediatly after access the class
    private Datasource() {

    }

    public static Datasource getInstance(){
        return instance;
    }

    //From now on the calling convention will be:
    //Datasource.getInstance().methodName();

    public boolean open() {
        try {
            System.out.println("Path to Database: "  + DB_PATH);
            conn = DriverManager.getConnection(CONNECTION_STRING);
            querySongInfoView = conn.prepareStatement(QUERY_VIEW_SONG_INFO_PREP);
            insertIntoArtists = conn.prepareStatement(INSERT_ARTIST, Statement.RETURN_GENERATED_KEYS);
            insertIntoAlbums = conn.prepareStatement(INSERT_ALBUMS,Statement.RETURN_GENERATED_KEYS);
            insertIntoSongs = conn.prepareStatement(INSERT_SONGS);
            queryArtist = conn.prepareStatement(QUERY_ARTIST);
            queryAlbum = conn.prepareStatement(QUERY_ALBUM);
            queryAlbumsByArtistId = conn.prepareStatement(QUERY_ALBUMS_BY_ARTIST_ID);
            updateArtistName = conn.prepareStatement(UPDATE_ARTIST_NAME);

            return true;
        } catch (SQLException e) {
            System.out.println("Couldn't connect to database:" + e.getMessage());
            return false;
        }
    }

    public void close(){
        try {
            if (querySongInfoView != null){
                querySongInfoView.close();
            }
            if (insertIntoSongs != null){
                insertIntoSongs.close();
            }
            if (insertIntoAlbums != null){
                insertIntoAlbums.close();
            }
            if (insertIntoArtists != null){
                insertIntoArtists.close();
            }
            if (queryArtist != null){
                queryArtist.close();
            }
            if (queryAlbum != null){
                queryAlbum.close();
            }
            if (queryAlbumsByArtistId != null){
                queryAlbumsByArtistId.close();
            }
            if (updateArtistName != null){
                updateArtistName.close();
            }
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
            System.out.println("Couldn't close connection:" + e.getMessage());
        }
    }

    public List<Artist> queryArtist(int sortOder) {

        StringBuilder sb = new StringBuilder("SELECT * FROM ");
        sb.append(TABLE_ARTISTS);
        if (sortOder != ORDER_BY_NONE){
            sb.append(" ORDER BY ");
            sb.append(COL_ARTIST_NAME);
            sb.append(" COLLATE NOCASE ");
            sb.append((sortOder == ORDER_BY_DESC) ? "DESC" : "ASC");

        }

        try(Statement statement = conn.createStatement();
            ResultSet results = statement.executeQuery(sb.toString())) {


            List<Artist> artists = new ArrayList<>();
            while(results.next()){
                //The code inside Try Catch will slow down the app
                //So that we'll be able to see the progressbar in the app
                try {
                    Thread.sleep(20);
                } catch (InterruptedException e) {
                    System.out.println("Upssss: " + e.getMessage());
                }


                Artist artist = new Artist();
                artist.setId(results.getInt(INDEX_ARTIST_ID));
                artist.setName(results.getString(INDEX_ARTIST_NAME));
                artists.add(artist);
            }

            return artists;

        } catch (SQLException e){
            System.out.println("Query failed: " + e.getMessage() );
            return null;
        }
// Finally cluse is not neccesary when using try with resources as either statement and resultset will be closed
/*        finally {
            //There are 2 different try catch to ensure that if one fails (either closing resultset or statement)
            //the other will still be executed
            try {
                if (results != null) {
                    results.close();
                }
            } catch (SQLException e) {
                System.out.println("Error closing resultset: " + e.getMessage());
            }
            try {
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException e) {
                System.out.println("Error closing statement: " + e.getMessage());
            }
        }*/
    }

    public List<Album> queryAlbumForArtistId(int id){
        try {
            queryAlbumsByArtistId.setInt(1, id);
            ResultSet results = queryAlbumsByArtistId.executeQuery();

            List<Album> albums = new ArrayList<>();

            while(results.next()){
                Album album = new Album();
                album.setId(results.getInt(1));
                album.setName(results.getString(2));
                album.setArtistId(id);
                albums.add(album);
            }

            return albums;
        } catch (SQLException e){
            System.out.println("Query Failed: " + e.getMessage());
            return null;
        }
    }

    public List<String> queryAlbumsForArtist (String artistName){
        return queryAlbumsForArtist( artistName, 1);
    }
    public List<String> queryAlbumsForArtist (String artistName, int sortOrder){
        StringBuilder sb = new StringBuilder("SELECT ");
        sb.append(TABLE_ALBUMS);
        sb.append('.');
        sb.append(COL_ALBUM_NAME);
        sb.append(" FROM ");
        sb.append(TABLE_ALBUMS);
        sb.append(" INNER JOIN ");
        sb.append(TABLE_ARTISTS);
        sb.append(" ON ");
        sb.append(TABLE_ALBUMS);
        sb.append('.');
        sb.append(COL_ALBUM_ARTIST);
        sb.append(" = ");
        sb.append(TABLE_ARTISTS);
        sb.append(".");
        sb.append(COL_ARTIST_ID);
        sb.append(" WHERE ");
        sb.append(TABLE_ARTISTS);
        sb.append('.');
        sb.append(COL_ARTIST_NAME);
        sb.append(" = \"");
        sb.append(artistName);
        sb.append("\"");

        if (sortOrder != ORDER_BY_NONE){
            sb.append(" ORDER BY ");
            sb.append(TABLE_ALBUMS);
            sb.append('.');
            sb.append(COL_ALBUM_NAME);
            sb.append(" COLLATE NOCASE ");
            if(sortOrder == ORDER_BY_DESC){
                sb.append("DESC");
            } else {
                sb.append("ASC");
            }
        }

        System.out.println("SQL statement = " + sb.toString());

        try(Statement statement = conn.createStatement();
            ResultSet results = statement.executeQuery(sb.toString())) {
            List<String> albums = new ArrayList<>();
            while (results.next()){
                albums.add(results.getString(1));
            }

            return albums;

        } catch(SQLException e){
            System.out.println("Query failed: " + e.getMessage());
            return null;
        }



    }

    public void querySongsMetadata() {
        String sql = "SELECT * FROM " + TABLE_SONGS;

        try (Statement statement = conn.createStatement();
             ResultSet results = statement.executeQuery(sql)){

            ResultSetMetaData meta = results.getMetaData();
            int numColumns = meta.getColumnCount();
            for (int i=1; i <= numColumns; i++){
                System.out.format("Column %d in the songs table is named %s\n",
                        i, meta.getColumnName(i));
            }
        } catch (SQLException e) {
            System.out.println("Query failed: " + e.getMessage());
        }
    }

    public int getCount(String table) {
        String sql = "SELECT COUNT(*) AS count, MIN(_id) AS min_id FROM " + table;
        try (Statement st = conn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {
            int count = rs.getInt("count");
            int min = rs.getInt("min_id");
            System.out.format("Count = %d, Min = %d\n", count, min);
            return count;
        } catch (SQLException e) {
            System.out.println("Query failed " + e.getMessage());
            return -1;
        }
    }

    public boolean createViewForSongArtists(){
        try (Statement st = conn.createStatement()) {
            st.execute(CREATE_ARTIST_FOR_SONG_VIEW);
            System.out.println(CREATE_ARTIST_FOR_SONG_VIEW);
            System.out.println("View created");
            return true;
        } catch (SQLException e) {
            System.out.println("Create view failed " + e.getMessage());
            return false;
        }
    }


    private int insertArtist(String name) throws SQLException {
        queryArtist.setString(1, name);
        ResultSet results = queryArtist.executeQuery();
        if(results.next()){
            return results.getInt(1);
        } else {
            //insert the artist
            insertIntoArtists.setString(1, name);
            int affectedRows = insertIntoArtists.executeUpdate();
            if (affectedRows != 1) {
                throw new SQLException("Couldn't insert artist");
            }

            ResultSet generatedKeys = insertIntoArtists.getGeneratedKeys();
            if (generatedKeys.next()){
                return generatedKeys.getInt(1);
            } else {
                throw new SQLException("Couldn't get _id for artist");
            }
        }
    }

    private int insertAlbum(String name, int artistId) throws SQLException {
        queryAlbum.setString(1, name);
        ResultSet results = queryAlbum.executeQuery();
        if(results.next()){
            return results.getInt(1);
        } else {
            //insert the album
            insertIntoAlbums.setString(1, name);
            insertIntoAlbums.setInt(2, artistId);
            int affectedRows = insertIntoAlbums.executeUpdate();
            if (affectedRows != 1) {
                throw new SQLException("Couldn't insert album");
            }

            ResultSet generatedKeys = insertIntoAlbums.getGeneratedKeys();
            if (generatedKeys.next()){
                return generatedKeys.getInt(1);
            } else {
                throw new SQLException("Couldn't get _id for album");
            }
        }
    }

    public boolean updateArtistName(int id, String newName){
        try {
            updateArtistName.setString(1, newName);
            updateArtistName.setInt(2, id);
            int affectedRecords = updateArtistName.executeUpdate();

            return affectedRecords == 1;

        } catch (SQLException e) {
            System.out.println("Update Failed: " + e.getMessage());
            return false;
        }
    }

    public void insertSong(String title, String artist, String album, int track) {

        try {
            conn.setAutoCommit(false);

            int artistId = insertArtist(artist);
            int albumId = insertAlbum(album, artistId);
            insertIntoSongs.setInt(1, track);
            insertIntoSongs.setString(2, title);
            insertIntoSongs.setInt(3, albumId);
            int affectedRows = insertIntoSongs.executeUpdate();
            if (affectedRows == 1) {
                conn.commit();
            } else {
                throw new SQLException("The song insertion failed");
            }
        } catch (Exception e){
            System.out.println("insert song exception: " + e.getMessage());
            try {
                System.out.println("Performing rollback");
                conn.rollback();
            } catch(SQLException e2) {
                System.out.println("bufff What to say?" + e2.getMessage());
            }
        } finally {
            try {
                System.out.println("Resetting default commit bahaviour");
                conn.setAutoCommit(true);
            } catch (SQLException e) {
                System.out.println("Couldn't reset auto-commit! " + e.getMessage());
            }
        }

    }



}
