public enum Turno {
    MATUTINO(1),
    VESPERTINO(2),
    NOTURNO(3),
    DIURNO(4),
    INTEGRAL(5);

    private int id;

    Turno(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}

public enum Materia {
    MATEMATICA(1),
    PORTUGUES(2),
    BIOLOGIA(3),
    CIENCIAS(4),
    HISTORIA(5),
    GEOGRAFIA(6),
    ARTES(7);

    private int id;

    Materia(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}

public enum Escolaridade {
    SUPERIOR(1),
    MESTRADO_CURSANDO(2),
    MESTRADO(3),
    DOUTORADO_CURSANDO(4),
    DOUTORADO(5);

    private int id;

    Escolaridade(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}