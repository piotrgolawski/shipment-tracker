package com.shipment.tracker.service;

import com.shipment.tracker.model.TruckLocation;
import com.shipment.tracker.repository.TruckLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class TruckService {

    @Autowired
    private TruckLocationRepository truckLocationRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void saveAndUpdateLocation(TruckLocation location) {
        truckLocationRepository.save(location);

        messagingTemplate.convertAndSend("/topic/truckLocation", location);
    }
}
