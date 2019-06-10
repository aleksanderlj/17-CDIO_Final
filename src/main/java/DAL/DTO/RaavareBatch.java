package DAL.DTO;

public class RaavareBatch {
    private int raavareBatchId, raavareId;
    private double maengde;
    private String leverandoer;

    public RaavareBatch(){ }

    public RaavareBatch(int raavareBatchId, int raavareId, double maengde, String leverandoer){
        this.raavareBatchId = raavareBatchId;
        this.raavareId = raavareId;
        this.maengde = maengde;
        this.leverandoer = leverandoer;
    }

    public int getRaavareBatchId() {
        return raavareBatchId;
    }

    public void setRaavareBatchId(int raavareBatchId) {
        this.raavareBatchId = raavareBatchId;
    }

    public int getRaavareId() {
        return raavareId;
    }

    public void setRaavareId(int raavareId) {
        this.raavareId = raavareId;
    }

    public double getMaengde() {
        return maengde;
    }

    public void setMaengde(double maengde) {
        this.maengde = maengde;
    }

    public String getLeverandoer() {
        return leverandoer;
    }

    public void setLeverandoer(String leverandoer) {
        this.leverandoer = leverandoer;
    }
}
