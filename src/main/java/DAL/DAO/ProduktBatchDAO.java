package DAL.DAO;

import DAL.DTO.IProduktBatch;
import java.sql.SQLException;
import DAL.DTO.ProduktBatch

public class ProduktBatchDAO implements IDAO<IProduktBatch> {

    @Override
    public int create(IProduktBatch produktBatch) throws SQLException {
        return 0;
    }
}
