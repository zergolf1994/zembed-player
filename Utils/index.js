"use strict";

module.exports = {
  Generate: require("./_Generate"),
  Alert: require("./_Alert"),
  AllowSource: require("./_Allow_Source"),
  Get_Settings: require("./_Get_Settings"),
  Google: {
    Auth: require("./_GoogleAuth"),
  },
  Proxy: {
    Google: require("./_Proxy_Google"),
    Cache: require("./_Proxy_Cache"),
  },
  GetOne: {
    Backup: require("./_Get_Backup"),
    Storage: require("./_Get_Storage"),
  },
  Cache: require("./_Cache"),
};
