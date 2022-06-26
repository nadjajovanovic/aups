package projekat.mappers;

import projekat.dto.TransportDTO;
import projekat.models.Transport;
import projekat.models.Vrstatransporta;

public class TransportMapper {
	
	@SuppressWarnings("null")
	public void toDTO(TransportDTO dto) {
		Transport transport = null;
		Vrstatransporta vt = null;
		transport.setTransportid(dto.getTransportid());
		transport.setDatumt(dto.getDatumt());
		transport.setLokacija(dto.getLokacija());
		transport.setVrstatransporta(dto.getVrstatransporta(vt.getNazivvt()));
	}

}
