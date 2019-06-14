package DAL.DTO;

public class Recept {
    private int id;
    private String navn;
    private ReceptKomp[] indholdsListe;

    public Recept() {
    }

    public Recept(int id, String navn, ReceptKomp[] indholdsListe) {
        this.id = id;
        this.navn = navn;
        this.indholdsListe = indholdsListe;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setIndholdsListe(ReceptKomp[] indholdsListe) {
        this.indholdsListe = indholdsListe;
    }

    public ReceptKomp[] getIndholdsListe() {
        return indholdsListe;
    }

    public String getNavn() {
        return navn;
    }
}
