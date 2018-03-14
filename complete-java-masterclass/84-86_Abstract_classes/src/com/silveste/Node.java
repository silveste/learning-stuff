package com.silveste;

public class Node extends ListItem {
    public Node(Object value){
        super(value);
    }

    @Override
    ListItem next() {
        return this.nextLink;
    }

    @Override
    ListItem setNext(ListItem item) {
        this.nextLink = item;
        return this.nextLink;
    }

    @Override
    ListItem prev() {
        return this.prevLink;
    }

    @Override
    ListItem setPrev(ListItem item) {
        this.prevLink = item;
        return this.prevLink;
    }

    @Override
    int compareTo(ListItem item) {
        if (item != null){
            return((String) super.getValue()).compareTo((String) item.getValue());
        } else {
            return -1;
        }
    }
}
