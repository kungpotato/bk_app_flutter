import 'package:core_ui/core_ui.dart';
import 'package:flutter/material.dart';

extension BuildContextX on BuildContext {
  BkTheme get theme => Theme.of(this).extension<BkTheme>()!;
}
