module com.silveste.db {
    requires java.sql;
    requires sqlite.jdbc;
    //this module return packages that return objects from com.silveste.common therefore to avoid other requirements
    //in modules that use this module is better to create com.silveste.common transitive
    requires  transitive com.silveste.common;

    exports com.silveste.db;
}