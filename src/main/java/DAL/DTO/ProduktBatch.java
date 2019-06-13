package DAL.DTO;

public class ProduktBatch{
    private int id, receptId, batchStatus;
    private String opstartDato, slutDato;

    public ProduktBatch(){ }

    public ProduktBatch(int id, int receptId, int batchStatus, String opstartDato, String slutDato) {
        this.id = id;
        this.receptId = receptId;
        this.batchStatus = batchStatus;
        this.opstartDato = opstartDato;
        this.slutDato = slutDato;
    }

    public ProduktBatch(int receptId, int batchStatus, String opstartDato, String slutDato){
        this.receptId = receptId;
        this.batchStatus = batchStatus;
        this.opstartDato = opstartDato;
        this.slutDato = slutDato;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getReceptId() {
        return receptId;
    }

    public void setReceptId(int receptId) {
        this.receptId = receptId;
    }

    public int getBatchStatus() {
        return batchStatus;
    }

    public void setBatchStatus(int batchStatus) {
        this.batchStatus = batchStatus;
    }

    public String getOpstartDato() {
        return opstartDato;
    }

    public void setOpstartDato(String opstartDato) {
        this.opstartDato = opstartDato;
    }

    public String getSlutDato() {
        return slutDato;
    }

    public void setSlutDato(String slutDato) {
        this.slutDato = slutDato;
    }
}
