package com.silveste;

public  abstract class ListItem {
    protected ListItem nextLink = null;
    protected ListItem prevLink = null;

    protected Object value;

    public ListItem(Object value){
        this.value = value;
    }

    abstract ListItem next();
    abstract ListItem setNext(ListItem item);
    abstract ListItem prev();
    abstract ListItem setPrev(ListItem item);

    abstract int compareTo(ListItem item);

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

}
