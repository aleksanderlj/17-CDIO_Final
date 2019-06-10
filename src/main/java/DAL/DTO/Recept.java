package DAL.DTO;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class Recept {
    private int receptID;
    private String navn;
    //private ArrayList<ReceptKomp> indholdsListe;
    private ReceptKomp[] indholdsListe;

    public Recept(){}
/*
    public Recept(int receptID, String navn, int[] raavareID, double[] nonNetto, double[] tolerance){
        for (int i = 0; i < raavareID.length; i++){
            indholdsListe.add(new ReceptKomp(raavareID[i], nonNetto[i], tolerance[i]));
        }
        this.receptID = receptID;
        this.navn = navn;
    }
*/

public Recept(int receptID, String navn, ReceptKomp[] indholdsListe){
    this.receptID = receptID;
    this.navn = navn;
    this.indholdsListe = indholdsListe;
}

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public int getReceptID() {
        return receptID;
    }

    public void setReceptID(int receptID) {
        this.receptID = receptID;
    }
/*
    public ArrayList<ReceptKomp> getIndholdsListe() {
        return indholdsListe;
    }

    public void setIndholdsListe(ArrayList<ReceptKomp> indholdsListe) {
        this.indholdsListe = indholdsListe;
    }
    */

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
