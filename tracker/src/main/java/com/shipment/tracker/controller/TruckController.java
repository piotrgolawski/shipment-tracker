package com.shipment.tracker.controller;

import com.shipment.tracker.model.TruckLocation;
import com.shipment.tracker.service.TruckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TruckController {

    @Autowired
    private TruckService truckService;

    @PostMapping("/update-location")
    public String updateLocation(@RequestBody TruckLocation location) {
        truckService.saveAndUpdateLocation(location);
        return "Location updated";
    }
}
