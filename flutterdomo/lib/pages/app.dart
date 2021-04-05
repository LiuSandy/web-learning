import 'dart:convert';

import 'package:flutter/material.dart';

List loadJSON(context) {
  var jsonData = DefaultAssetBundle.of(context).loadString("mock/list.json");
  final jsonresult = json.decode(jsonData.toString());
  // print(jsonresult['data'].toList().length);
  // var obj = jsonDecode(listJson);
  return jsonresult['data'].toList();
}

// ignore: must_be_immutable
class ContendList extends StatelessWidget {
  var list = [];
  var title = '头条app';
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(title: new Text(title)),
        body: new FutureBuilder(
            future: DefaultAssetBundle.of(context).loadString('mock/list.json'),
            builder: (context, snapshot) {
              if (snapshot.data == null) {
                return new CircularProgressIndicator();
              }
              if (this.list.length <= 0) {
                this.list = json.decode(snapshot.data.toString())['data'];
              }
              return _getList(this.list);
            }));
  }

  Widget _getList(listData) {
    return new GestureDetector(
        onTap: () {
          print('taping');
        },
        child: new ListView.builder(
            padding: EdgeInsets.all(10.0),
            itemBuilder: (context, i) {
              if (i < listData.length) {
                return new Text(listData[i]['type']);
              }
              return null;
            }));
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Demo',
        home: new Scaffold(
          appBar: new AppBar(
            title: new Text("Lius"),
          ),
          body: new ContendList(),
        ));
  }
}
