# config.py

from authomatic.providers import oauth2, oauth1

CONFIG = {
    
    'tw': { # Your internal provider name
           
        # Provider class
        'class_': oauth1.Twitter,
        
        # Twitter is an AuthorizationProvider so we need to set several other properties too:
        'consumer_key': 'Wqk3fOdOmX4g6pemCG1zQbPGv',
        'consumer_secret': 'uLp5BDoogrCGeHASnIRQGdfGVpg9QMA4S9rHANEEV9hiWdEsky',
    },
    
   
}
