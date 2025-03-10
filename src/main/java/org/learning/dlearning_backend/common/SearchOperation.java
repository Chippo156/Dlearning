package org.learning.dlearning_backend.common;

public enum SearchOperation {

    EQUALITY , NEGATION, GREATER_THAN, LESS_THAN, LIKE, STARTS_WITH, ENDS_WITH, CONTAINS;
    public static final String OR_PREDICATE = "'";
    public static final String ZERO_OR_MORE_REGEX = "*";
    public static SearchOperation getOperation(char input){
        return switch (input){
            case '~' -> LIKE;
            case ':' -> EQUALITY;
            case '!' -> NEGATION;
            case '>' -> GREATER_THAN;
            case '<' -> LESS_THAN;
            case '.' -> CONTAINS;
            case '$' -> ENDS_WITH;
            case '^' -> STARTS_WITH;
            default -> null;
        };
    }
}
