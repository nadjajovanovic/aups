package projekat.models;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the vrstatransporta database table.
 * 
 */
@Entity
@NamedQuery(name="Vrstatransporta.findAll", query="SELECT v FROM Vrstatransporta v")
public class Vrstatransporta implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="VRSTATRANSPORTA_VRSTATRANSPORTAID_GENERATOR", sequenceName="VRSTA_TRANSPORTA_SEQ", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="VRSTATRANSPORTA_VRSTATRANSPORTAID_GENERATOR")
	private Integer vrstatransportaid;

	private String nazivvt;

	//bi-directional many-to-one association to Transport
	/*@JsonIgnore
	@OneToMany(mappedBy="vrstatransporta")
	private List<Transport> transports;*/

	public Vrstatransporta() {
	}

	public Integer getVrstatransportaid() {
		return this.vrstatransportaid;
	}

	public void setVrstatransportaid(Integer vrstatransportaid) {
		this.vrstatransportaid = vrstatransportaid;
	}

	public String getNazivvt() {
		return this.nazivvt;
	}

	public void setNazivvt(String nazivvt) {
		this.nazivvt = nazivvt;
	}

	/*public List<Transport> getTransports() {
		return this.transports;
	}

	public void setTransports(List<Transport> transports) {
		this.transports = transports;
	}

	public Transport addTransport(Transport transport) {
		getTransports().add(transport);
		transport.setVrstatransporta(this);

		return transport;
	}

	public Transport removeTransport(Transport transport) {
		getTransports().remove(transport);
		transport.setVrstatransporta(null);

		return transport;
	}*/

}