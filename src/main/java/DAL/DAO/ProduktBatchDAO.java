package DAL.DAO;

//import DAL.DTO.IProduktBatch;
import java.sql.SQLException;
import DAL.DTO.ProduktBatch;

public class ProduktBatchDAO implements IDAO<ProduktBatch> {

    @Override
    public int create(ProduktBatch produktBatch) throws SQLException {
        return 0;
    }
}
