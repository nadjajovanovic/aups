package projekat.dto;

import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

public class TransportDTO {

	private Integer transportid;
	
	@Temporal(TemporalType.DATE)
	private Date datumt;
	
	private String lokacija;
	
	private String nazivvt;

	public Integer getTransportid() {
		return transportid;
	}

	public void setTransportid(Integer transportid) {
		this.transportid = transportid;
	}

	public Date getDatumt() {
		return datumt;
	}

	public void setDatumt(Date datumt) {
		this.datumt = datumt;
	}

	public String getLokacija() {
		return lokacija;
	}

	public void setLokacija(String lokacija) {
		this.lokacija = lokacija;
	}

	public String getNazivvt() {
		return nazivvt;
	}

	public void setNazivvt(String nazivvt) {
		this.nazivvt = nazivvt;
	}

	
	
	
}
